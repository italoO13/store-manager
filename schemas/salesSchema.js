const joi = require('joi');

const sales = joi.object({
  productId: joi.number().min(0).required().messages({
    'number.min': '422|"productId" must be greater than or equal to 1',
    'number.empty': '400|"productId" is required',
    'any.required': '400|"productId" is required',
  }),
  quantity: joi.number().min(1).required().messages({
    'number.min': '422|"quantity" must be greater than or equal to 1',
    'number.empty': '400|"quantity" is required',
    'any.required': '400|"quantity" is required',
  }),
});

module.exports = {
  sales,
};