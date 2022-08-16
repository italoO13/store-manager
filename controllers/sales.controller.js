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

const deleteSales = async (req, res, _next) => {
  const { id } = req.params;
  const response = await salesServices.deleteSales(id);
  if (response === false) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  res.status(204).json(response);
};

const updateSales = async (req, res, _next) => {
  const { id } = req.params;
  const response = await salesServices.updateSales(req.body, id);
  if (response.error) {
    return res.status(404).json({ message: response.error });
  }
  res.status(200).json({
    saleId: id,
    itemsUpdated: req.body,
  });
};

module.exports = {
  insertSales,
  getSalesAll,
  getSalesById,
  deleteSales,
  updateSales,
};
