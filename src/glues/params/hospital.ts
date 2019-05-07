import Joi = require('joi');

export let getHospitalDetail = Joi.object({
  hospitalName: Joi.string().required()
});

export let getAllHospitalDetail = Joi.object({
  currentPage: Joi.number()
    .min(1)
    .required(),
  pageSize: Joi.number()
    .min(10)
    .required()
});
