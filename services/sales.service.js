const Sales = require('../models/Sales');

const insertSales = async (sales) => {
  const response = await Sales.insertSales(sales);
  if (response === false) {
    return false;
  }
  return response;
};

const getSalesAll = async () => {
  const response = await Sales.getSalesAll();
  if (response === false) {
    return false;
  }
  return response;
};

const getSalesById = async (id) => {
  const response = await Sales.getSalesById(id);
  if (response === false) {
    return false;
  }
  return response;
};

const deleteSales = async (id) => {
  const response = await Sales.deleteSales(id);
  if (response === false) {
    return false;
  }
  return response;
};

const updateSales = async (sales, id) => {
  const response = await Sales.updateSales(sales, id);
  return response;
};

module.exports = {
  insertSales,
  getSalesAll,
  getSalesById,
  deleteSales,
  updateSales,
};