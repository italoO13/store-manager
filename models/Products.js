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

// getProductById(1).then((teste) => console.log(teste));
module.exports = {
  getProductsAll,
  getProductById,
};