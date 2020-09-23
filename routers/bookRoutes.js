const express = require('express');
const bookController = require('../controller/bookController');
const authController = require('../controller/authController');

const router = express.Router();

router.
      route('/')
      .get(bookController.getAllBooks)
      .post(
          authController.protect,
          authController.restrictTo('admin'),
          bookController.createBook);
          
 router
      .route('/:id')
      .patch(
        authController.protect,
        authController.restrictTo('admin'),
        bookController.UploadBookPhoto,
        bookController.resizeBookPhoto,
        bookController.UpdateBook 
      );         


module.exports = router;        
   