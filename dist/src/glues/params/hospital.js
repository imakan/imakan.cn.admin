"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.getHospitalDetail = Joi.object({
    hospitalName: Joi.string().required()
});
//# sourceMappingURL=hospital.js.map