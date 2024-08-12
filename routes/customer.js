const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer')
const { restrict, checkLogin, checkAccess } = require('../lib/auth')

router.get('/login' , customerController.getLogin)

router.post('/login' , customerController.postLogin)

router.get('/signup' , customerController.getSignup)

router.post('/signup' , customerController.postSignup)

router.post('/logout' , customerController.logout)


module.exports = router;