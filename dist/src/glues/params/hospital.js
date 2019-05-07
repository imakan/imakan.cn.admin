"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.getHospitalDetail = Joi.object({
    hospitalName: Joi.string().required()
});
exports.getAllHospitalDetail = Joi.object({
    currentPage: Joi.number()
        .min(1)
        .required(),
    pageSize: Joi.number()
        .min(10)
        .required()
});
//# sourceMappingURL=hospital.js.map