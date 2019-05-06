import Joi = require('joi');

export let getHospitalDetail = Joi.object({
  hospitalName: Joi.string().required()
});
