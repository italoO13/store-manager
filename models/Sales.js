const connection = require('./connection');

const insertSalesProducts = async ({ productId, quantity }, id) => {
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES(?,?,?)
  `;
  await connection.execute(query, [id, productId, quantity]);
};

const insertSales = async (sales) => {
  const [response] = await connection.execute('INSERT INTO StoreManager.sales VALUES()');
  await sales.map((obj) => insertSalesProducts(obj, response.insertId));
  return {
    id: response.insertId,
    itemsSold: sales,
  };
};

module.exports = {
  insertSales,
};