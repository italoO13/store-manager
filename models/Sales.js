const connection = require('./connection');

const validateExistsProduct = async ({ productId, _quantity }) => {
  const query = `SELECT name FROM StoreManager.products
  WHERE id= ?`;
  const [response] = await connection.execute(query, [productId]);
  return response.length === 0;
};

const insertSalesProducts = async ({ productId, quantity }, id) => {
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES(?,?,?)
  `;
  await connection.execute(query, [id, productId, quantity]);
};

const insertSales = async (sales) => {
    const existsProduct = await Promise.all(sales.map(validateExistsProduct));
  
    if (existsProduct.includes(true)) {
      return false;
    }

    const [response] = await connection.execute('INSERT INTO StoreManager.sales VALUES()');
  
    await sales.map((obj) => insertSalesProducts(obj, response.insertId));
    console.log('entrou aqui');
    return {
      id: response.insertId,
      itemsSold: sales,
    };
};

module.exports = {
  insertSales,
  validateExistsProduct,
  insertSalesProducts,
};