const joi = require('joi');

const shemaNameProduct = joi.object({
  name: joi.string().min(5).required().messages({
    'string.min': '422|"name" length must be at least 5 characters long',
    'string.empty': '400|"name" is required',
    'any.required': '400|"name" is required',
  }),
});

module.exports = {
  shemaNameProduct,
};