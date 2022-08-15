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
    return {
      id: response.insertId,
      itemsSold: sales,
    };
};

const getSalesAll = async () => {
  const [response] = await connection.execute(
    `SELECT sp.sale_id AS 'saleId', s.date, sp.product_id AS 'productId', sp.quantity 
        FROM StoreManager.sales_products AS sp
        INNER JOIN StoreManager.sales AS s
        ON sp.sale_id = s.id
        ORDER BY sp.sale_id, sp.product_id`,
);
  if (!response.length) {
    return false;
  }
  return response;
};

const getSalesById = async (id) => {
  const [response] = await connection.execute(
    `SELECT s.date, sp.product_id AS 'productId', sp.quantity 
        FROM StoreManager.sales_products AS sp
        INNER JOIN StoreManager.sales AS s
        ON sp.sale_id = s.id
        WHERE sp.sale_id = ?
        ORDER BY sp.sale_id, sp.product_id`, [id],
  );
  if (!response.length) {
    return false;
  }
  return response;
};

// const updateSales = async (prod) => {
//   const query = `UPDATE StoreManager.products
//     SET name = ?
//     WHERE id = ?
//   `;
//   const [response] = await connection.execute(query, [prod.name, prod.id]);
//   if (!response.affectedRows) {
//     return false;
//   }
//   return true;
// };

const deleteSales = async (id) => {
  const queryDelSalesProd = `DELETE FROM StoreManager.sales_products
  WHERE sale_id = ?
  `;
  const queryDelSales = `DELETE FROM StoreManager.sales
  WHERE id = ?
  `;
  await connection.execute(queryDelSalesProd, [id]);

  const [response] = await connection.execute(queryDelSales, [id]);

  if (!response.affectedRows) {
    return false;
  }
  return true;
};

module.exports = {
  insertSales,
  validateExistsProduct,
  insertSalesProducts,
  getSalesAll,
  getSalesById,
  deleteSales,
};