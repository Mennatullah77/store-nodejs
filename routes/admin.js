const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')

router.get('/admin/setup', adminController.getSetup);

router.post('/admin/setup' , adminController.postSetup )

router.get('/admin/login' , adminController.getLogin )

router.post('/admin/login' , adminController.postLogin)

router.get('/admin/dashboard' , adminController.dashboard)




module.exports = router;
