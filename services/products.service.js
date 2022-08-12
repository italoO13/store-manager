const CustomError = require('../errors/customError');
const Products = require('../models/Products');

const getProductsAll = async () => {
  const response = await Products.getProductsAll();
  if (!response) {
    throw new CustomError(404, 'Product not found');
  }
  return response;
};

const getProductById = async (id) => {
  const response = await Products.getProductById(id);
  if (!response) {
    throw new CustomError(404, 'Product not found');
  }
  return response;
};

module.exports = {
  getProductsAll,
  getProductById,
};