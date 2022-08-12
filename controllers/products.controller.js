const productsServices = require('../services/products.service');

const getProductsAll = async (_req, res, _next) => {
  const response = await productsServices.getProductsAll();
  res.status(200).json(response);
};

const getProductById = async (req, res, _next) => {
  const { id } = req.params;
  const response = await productsServices.getProductById(id);
  res.status(200).json(response);
};

module.exports = {
  getProductsAll,
  getProductById,
};