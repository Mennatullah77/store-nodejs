const express = require('express');
const router = express.Router();
const productController = require('../controllers/product')
const { restrict, checkLogin, checkAccess } = require('../lib/auth')

router.get('/admin/products' ,restrict, productController.getProducts)

router.get('/admin/product/new' , restrict , checkAccess , productController.getNewProduct)

router.post('/admin/product/new' , restrict ,checkAccess , productController.postNewProduct)

router.get('/admin/product/edit/:productId' , restrict , checkAccess , productController.getEditProduct)

router.post('/admin/product/edit' , restrict , checkAccess ,productController.postEditProduct)

module.exports = router;
