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

const getSearchTerm = async (term) => {
  const response = await Products.getSearchTerm(term);
  return response;
};

const insertProduct = async (name) => {
  const response = await Products.insertProduct(name);
  return response;
};

const updateProduct = async (name, id) => {
  const response = await Products.updateProduct({ name, id });
  if (!response) {
    return false;
  }
  return response;
};

const deleteProduct = async (id) => {
  const response = await Products.deleteProduct(id);
  if (!response) {
    return false;
  }
  return response;
};
 
module.exports = {
  getProductsAll,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
  getSearchTerm,
};