const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer')
const { restrict, checkLogin, checkAccess } = require('../lib/auth')

router.get('/category/:cat/:pageNum?' , customerController.getCategory);

router.get('/page/:pageNum?' , customerController.getPage);

router.get('/:page?' , customerController.getIndex);




module.exports = router;