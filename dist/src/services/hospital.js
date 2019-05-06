"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const daruk_1 = require("daruk");
const iconv = require("iconv-lite");
const rp = require("request-promise");
const hospital_1 = require("../model/hospital");
let code_regExp = /<a.+\"detail04_new\.jsp\?id=\d{8,}\">(\d{8,})<\/a>/g;
let name_regExp = /<a.+\"detail04_new\.jsp\?id=\d{8,}\">([^0-9].+)/g;
let county_regExp = /<td .+width=\"126\".+>(.+)<\/span><\/td>/g;
let type_regExp = /<td .+width=\"100\".+>(.+)<\/span><\/td>/g;
let level_regExp = /<td .+width=\"88\".+>(.+)<\/span><\/td>/g;
let address_regExp = /<td.+<b>单位地址<\/b>】<\/font>(.+)<\/td>/g;
let matchResult = (str, regExp) => {
    let result = str.match(regExp) || [];
    let arr = [];
    for (let id of result) {
        let temp = id.replace(regExp, '$1').replace(/<.+>/, '');
        arr.push(temp);
    }
    return arr;
};
let getHospitalDetail = async (hospitalName) => {
    return new Promise((resolve) => {
        let options = {
            method: 'GET',
            uri: 'http://www.bjrbj.gov.cn/LDJAPP/search/ddyy/ddyy_04_outline_new.jsp?sno=0&spage=0&epage=5&leibie=&suoshu=&sword=' + hospitalName
        };
        rp(options)
            .on('response', (res) => {
            let chunks = [];
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
let getHospitalAddress = async (hospitalCode) => {
    return new Promise((resolve) => {
        let options = {
            method: 'GET',
            uri: `http://www.bjrbj.gov.cn/LDJAPP/search/ddyy/detail04_new.jsp?id=${hospitalCode}`
        };
        rp(options)
            .on('response', (res) => {
            let chunks = [];
            res.on('data', (chunk) => {
                chunks = chunks.concat(chunk);
            });
            res.on('end', () => {
                let buf = Buffer.concat(chunks);
                let text = iconv.decode(buf, 'gbk');
                let address = matchResult(text, address_regExp);
                resolve(address);
            });
        })
            .catch((err) => {
            resolve([]);
            console.log(err);
        });
    });
};
class HospitalServer extends daruk_1.BaseService {
    async queryAll() {
        let _result = { code: 200, message: '', stack: '', data: new Array() };
        try {
            _result.data = await this.db(hospital_1.Hospital).getMany();
        }
        catch (e) {
            _result.code = 500;
            _result.stack = e;
            _result.message = JSON.stringify({ api: 'hospital/all', method: 'post' });
        }
        return _result;
    }
    async query(hospitalName) {
        let _result = { code: 200, message: '', stack: '', data: new Array() };
        let data = {};
        try {
            data = await this.db(hospital_1.Hospital)
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
                        let address = await getHospitalAddress(val.hospitalCode);
                        if (address[0]) {
                            await this.updateAddress(val.hospitalCode, address[0]);
                        }
                    }
                }
            }
            _result.data = data;
        }
        catch (e) {
            _result.code = 500;
            _result.stack = e;
            _result.message = JSON.stringify({ api: 'hospital', method: 'post' });
        }
        return _result;
    }
    async insert(hospitalCode, hospitalName, county, type, level, address) {
        try {
            await this.db(hospital_1.Hospital)
                .insert()
                .into(hospital_1.Hospital)
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
        }
        catch (e) {
            this.app.logger.info(`插入医院信息异常:${e}`);
        }
    }
    async updateAddress(hospitalCode, address) {
        try {
            await await this.db(hospital_1.Hospital)
                .update()
                .set({ address, updateTime: +new Date() })
                .where('hospitalCode = :hospitalCode', { hospitalCode })
                .execute();
        }
        catch (e) {
            this.app.logger.info(`更新医院地址信息异常:${e}`);
        }
    }
}
__decorate([
    daruk_1.glue('db'),
    __metadata("design:type", Object)
], HospitalServer.prototype, "db", void 0);
exports.default = HospitalServer;
//# sourceMappingURL=hospital.js.map