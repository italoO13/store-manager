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

const getSearchTerm = async (req, res, _next) => {
  const { q } = req.query;
  const response = await productsServices.getSearchTerm(q);
  res.status(200).json(response);
};

const postInsertProduct = async (req, res, _next) => {
  const { name } = req.body;
  const response = await productsServices.insertProduct(name);
  res.status(201).json(response);
};

const updateProduct = async (req, res, _next) => {
  const { id } = req.params;
  const { name } = req.body;
  const response = await productsServices.updateProduct(name, id);
  if (!response) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json({ id, name });
};

const deleteProduct = async (req, res, _next) => {
  const { id } = req.params;
  const response = await productsServices.deleteProduct(id);
  if (!response) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(204).json();
};

module.exports = {
  getProductsAll,
  getProductById,
  postInsertProduct,
  updateProduct,
  deleteProduct,
  getSearchTerm,
};