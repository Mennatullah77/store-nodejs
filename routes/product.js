const express = require('express');
const router = express.Router();
const productController = require('../controllers/product')

router.get('/admin/products' , productController.getProducts)

router.get('/admin/product/new' , productController.getNewProduct)

router.post('/admin/product/new' , productController.postNewProduct)

router.get('/admin/product/edit/:productId' , productController.getEditProduct)

router.post('/admin/product/edit' , productController.postEditProduct)

module.exports = router;
