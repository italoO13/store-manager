const connection = require('./connection');

const getProductsAll = async () => {
  const query = 'SELECT id, name FROM StoreManager.products ORDER BY id';
  const [response] = await connection.execute(query);
  if (!response.length) {
    return false;
  }
  return response;
};

const getProductById = async (id) => {
  const query = `SELECT id, name FROM StoreManager.products
  WHERE id = ?`;
  const [response] = await connection.execute(query, [id]);
  if (!response.length) {
    return false;
  }
  return response[0];
};

const insertProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [response] = await connection.execute(query, [name]);
  return {
    id: response.insertId,
    name,
  };
};

const updateProduct = async (prod) => {
  const query = `UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?
  `;
  const [response] = await connection.execute(query, [prod.name, prod.id]);
  if (!response.affectedRows) {
    return false;
  }
  return true;
};

module.exports = {
  getProductsAll,
  getProductById,
  insertProduct,
  updateProduct,
};