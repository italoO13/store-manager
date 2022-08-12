const CustomError = require('../errors/customError');
const productsShema = require('../schemas/productSchema');

const validatePostProduct = (req, res, next) => {
  const { error } = productsShema.shemaNameProduct.validate(req.body);
  if (!error) {
    return next();
  }
  const [code, message] = error.details[0].message.split('|');
  next(new CustomError(Number(code), message));
};

module.exports = {
  validatePostProduct,
};