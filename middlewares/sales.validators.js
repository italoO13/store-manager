const CustomError = require('../errors/customError');
const salesSchema = require('../schemas/salesSchema');

const isValid = (sales) => {
  sales.map((sal) => {
    const { error } = salesSchema.sales.validate(sal);
    if (error) {
      const [code, message] = error.details[0].message.split('|');
      throw new CustomError(Number(code), message);
    }
    return null;
  });
};

const insertValidator = (req, res, next) => {
  try {
    const sales = req.body;
    isValid(sales);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insertValidator,
};