const express = require('express');
const salesController = require('../controllers/sales.controller');
const { insertValidator } = require('../middlewares/sales.validators');

const router = express.Router();

router.post('/', insertValidator, salesController.insertSales);
router.get('/', salesController.getProductsAll);
router.get('/:id', salesController.getProductById);

module.exports = router;