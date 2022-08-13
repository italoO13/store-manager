const Sales = require('../models/Sales');

const insertSales = async (sales) => {
  const response = await Sales.insertSales(sales);
  if (response === false) {
    return false;
  }
  return response;
};

module.exports = {
  insertSales,
};