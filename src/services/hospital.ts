import { BaseService, Daruk, glue } from 'daruk';
import iconv = require('iconv-lite');
import rp = require('request-promise');
import { Hospital } from '../model/hospital';
let code_regExp = /<a.+\"detail01_new\.jsp\?id=\d{8,}\">(\d{8,})<\/a>/g;
let name_regExp = /<a.+\"detail01_new\.jsp\?id=\d{8,}\">([^0-9].+)/g;
let county_regExp = /<td .+width=\"126\".+>(.+)<\/span><\/td>/g;
let type_regExp = /<td .+width=\"100\".+>(.+)<\/span><\/td>/g;
let level_regExp = /<td .+width=\"88\".+>(.+)<\/span><\/td>/g;
let address_regExp = /<td.+<b>单位地址<\/b>】<\/font>(.+)<\/td>/g;
let matchResult = (str: string, regExp: RegExp) => {
  let result = str.match(regExp) || [];
  let arr = [];
  for (let id of result) {
    let temp = id.replace(regExp, '$1').replace(/<.+>/, '');
    arr.push(temp);
  }
  return arr;
};
let getHospitalDetail = async (hospitalName: string) => {
  let currentPage = 20 * 1;
  return new Promise((resolve) => {
    let options = {
      method: 'GET',
      uri: `http://www.bjrbj.gov.cn/LDJAPP/search/ddyy/ddyy_01_outline_new.jsp?sno=${currentPage}&spage=0&epage=0&leibie=00&suoshu=00&sword=` + hospitalName
    };
    rp(options)
      .on('response', (res) => {
        let chunks: any = [];
        res.on('data', (chunk) => {
          chunks = chunks.concat(chunk);
        });
        res.on('end', () => {
          let buf = Buffer.concat(chunks);
          let text = iconv.decode(buf, 'gbk');
          let hospitalCode = matchResult(text, code_regExp);
          let hospitalName = matchResult(text, name_regExp);
          let county = matchResult(text, county_regExp);
          let type = matchResult(text, type_regExp);
          let level = matchResult(text, level_regExp);
          let hospital = [];
          for (let i = 0; i < hospitalCode.length; i++) {
            hospital.push({
              hospitalCode: hospitalCode[i],
              hospitalName: hospitalName[i],
              county: county[i],
              type: type[i],
              level: level[i]
            });
          }
          resolve(hospital);
        });
      })
      .catch((err) => {
        console.log(err);
        resolve([]);
      });
  });
};

let getHospitalAddress = async (hospitalCode: string | number) => {
  return new Promise((resolve) => {
    let options = {
      method: 'GET',
      uri: `http://www.bjrbj.gov.cn/LDJAPP/search/ddyy/detail01_new.jsp?id=${hospitalCode}`
    };
    rp(options)
      .on('response', (res) => {
        let chunks: any = [];
        res.on('data', (chunk) => {
          chunks = chunks.concat(chunk);
        });
        res.on('end', () => {
          let buf = Buffer.concat(chunks);
          let text = iconv.decode(buf, 'gbk');
          let address: any[] = matchResult(text, address_regExp);
          resolve(address);
        });
      })
      .catch((err) => {
        resolve([]);
        console.log(err);
      });
  });
};

export default class HospitalServer extends BaseService {
  @glue('db')
  public db: Daruk['glue']['db'];

  public async queryAll(currentPage: number, pageSize: number) {
    let _result = { code: 200, message: '', stack: '', data: new Array(), total: 0 };
    try {
      let detail = await this.db(Hospital)
        .skip((currentPage - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount();
      _result.data = detail[0];
      _result.total = detail[1];
    } catch (e) {
      _result.code = 500;
      _result.stack = e;
      _result.message = JSON.stringify({ api: 'hospital/all', method: 'post' });
    }
    return _result;
  }

  public async query(hospitalName: string) {
    let _result = { code: 200, message: '', stack: '', data: new Array() };
    let data: any = {};
    try {
      data = await this.db(Hospital)
        .where('Hospital.hospitalName LIKE :hospitalName')
        .setParameters({
          hospitalName: '%' + hospitalName + '%'
        })
        .getMany();
      if (!data.length) {
        let buf = iconv.encode(hospitalName, 'gbk');
        let _hospitalName = '';
        let ch = '';
        for (let i of buf) {
          ch = i.toString(16);
          if (ch.length === 1) {
            ch = '0' + ch;
          }
          _hospitalName += '%' + ch;
        }
        _hospitalName = _hospitalName.toUpperCase();
        data = await getHospitalDetail(_hospitalName);
        for (let val of data) {
          await this.insert(val.hospitalCode, val.hospitalName, val.county, val.type, val.level, '');
          if (val.hospitalCode) {
            let address: any = await getHospitalAddress(val.hospitalCode);
            if (address[0]) {
              await this.updateAddress(val.hospitalCode, address[0]);
            }
          }
        }
      }
      _result.data = data;
    } catch (e) {
      _result.code = 500;
      _result.stack = e;
      _result.message = JSON.stringify({ api: 'hospital', method: 'post' });
    }
    return _result;
  }

  public async insert(hospitalCode: string, hospitalName: string, county: string, type: string, level: string, address: string) {
    try {
      await this.db(Hospital)
        .insert()
        .into(Hospital)
        .values({
          hospitalCode,
          hospitalName,
          county,
          type,
          level,
          address: address || '暂无',
          createTime: +new Date(),
          updateTime: +new Date()
        })
        .execute();
    } catch (e) {
      this.app.logger.info(`插入医院信息异常:${e}`);
    }
  }
  public async updateAddress(hospitalCode: string, address: string) {
    try {
      await await this.db(Hospital)
        .update()
        .set({ address, updateTime: +new Date() })
        .where('hospitalCode = :hospitalCode', { hospitalCode })
        .execute();
    } catch (e) {
      this.app.logger.info(`更新医院地址信息异常:${e}`);
    }
  }
}
