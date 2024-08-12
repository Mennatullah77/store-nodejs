const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')

router.get('/admin/setup', adminController.getSetup);

router.post('/admin/setup' , adminController.postSetup )

router.get('/admin/login' , adminController.getLogin )

router.post('/admin/login' , adminController.postLogin)

router.get('/admin/dashboard' , adminController.dashboard)

router.get('/admin/users' , adminController.getUsers)

router.get('/admin/user/new' , adminController.getNewUser)

router.post('/admin/user/new' , adminController.postNewUser)

router.get('/admin/user/edit/:userId' , adminController.getEditUser)

router.post('/admin/user/edit/:userId' , adminController.postEditUser)




module.exports = router;
