const express = require('express');
const categoryController = require('../controller/categoryController');
const authController = require('../controller/authController');


const router = express.Router();


router
    .route('/')
    .get(categoryController.getCategory)
    .post(authController.protect,
        authController.restrictTo('admin'),
        categoryController.createCategory);


module.exports = router;        