const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index')
const { restrict, checkLogin, checkAccess } = require('../lib/auth')


router.get('/category/:cat/:pageNum?' , indexController.getCategory);

router.get('/page/:pageNum?' , indexController.getPage);

router.get('/:page?' , indexController.getIndex);


module.exports = router;