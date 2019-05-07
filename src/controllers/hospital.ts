import { BaseController, Daruk, glue, post } from 'daruk';
import Joi = require('joi');

export default class Hospital extends BaseController {
  @glue('params')
  public params: Daruk['glue']['params'];
  @post('/')
  public async index() {
    const { error, value } = Joi.validate(this.ctx.request.body, this.params.getHospitalDetail);
    if (error) {
      this.ctx.body = { code: 403, message: error.details[0].message };
    } else {
      const { hospital } = this.service;
      let hospitalName = value.hospitalName;
      this.ctx.body = await hospital.query(hospitalName);
    }
  }
  @post('/all')
  public async all() {
    const { error, value } = Joi.validate(this.ctx.request.body, this.params.getAllHospitalDetail);
    if (error) {
      this.ctx.body = { code: 403, message: error.details[0].message };
    } else {
      const { hospital } = this.service;
      let currentPage = value.currentPage;
      let pageSize = value.pageSize;
      this.ctx.body = await hospital.queryAll(currentPage, pageSize);
    }
  }
}
