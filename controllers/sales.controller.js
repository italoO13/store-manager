const salesServices = require('../services/sales.service');

const insertSales = async (req, res, _next) => {
  const response = await salesServices.insertSales(req.body);
  if (response === false) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(201).json(response);
};

const getSalesAll = async (req, res, _next) => {
  const response = await salesServices.getSalesAll();
  if (response === false) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  res.status(200).json(response);
};

const getSalesById = async (req, res, _next) => {
  const { id } = req.params;
  const response = await salesServices.getSalesById(id);
  if (response === false) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  res.status(200).json(response);
};

module.exports = {
  insertSales,
  getSalesAll,
  getSalesById,
};
