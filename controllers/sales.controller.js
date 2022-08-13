const salesServices = require('../services/sales.service');

const insertSales = async (req, res, _next) => {
  const response = await salesServices.insertSales(req.body);
  if (response === false) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(201).json(response);
};

module.exports = {
  insertSales,
};
