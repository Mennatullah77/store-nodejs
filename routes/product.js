const express = require('express');
const router = express.Router();
const productController = require('../controllers/product')
const { restrict, checkLogin, checkAccess } = require('../lib/auth')

router.get('/admin/products' ,restrict, productController.getProducts)

router.get('/admin/product/new' , restrict ,productController.getNewProduct)

router.post('/admin/product/new' , restrict , productController.postNewProduct)

router.get('/admin/product/edit/:productId' , restrict ,productController.getEditProduct)

router.post('/admin/product/edit' , restrict , productController.postEditProduct)

module.exports = router;
