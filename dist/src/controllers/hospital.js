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
const Joi = require("joi");
class Hospital extends daruk_1.BaseController {
    async index() {
        const { error, value } = Joi.validate(this.ctx.request.body, this.params.getHospitalDetail);
        if (error) {
            this.ctx.body = { code: 403, message: error.details[0].message };
        }
        else {
            const { hospital } = this.service;
            let hospitalName = value.hospitalName;
            this.ctx.body = await hospital.query(hospitalName);
        }
    }
    async all() {
        const { hospital } = this.service;
        this.ctx.body = await hospital.queryAll();
    }
}
__decorate([
    daruk_1.glue('params'),
    __metadata("design:type", Object)
], Hospital.prototype, "params", void 0);
__decorate([
    daruk_1.post('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Hospital.prototype, "index", null);
__decorate([
    daruk_1.get('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Hospital.prototype, "all", null);
exports.default = Hospital;
//# sourceMappingURL=hospital.js.map