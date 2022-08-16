const express = require('express');
const productsController = require('../controllers/products.controller');
const { validatePostProduct } = require('../middlewares/products.validators');

const router = express.Router();

router.get('/search', productsController.getSearchTerm);
router.get('/', productsController.getProductsAll);
router.get('/:id', productsController.getProductById);
router.post('/', validatePostProduct, productsController.postInsertProduct);
router.put('/:id', validatePostProduct, productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;