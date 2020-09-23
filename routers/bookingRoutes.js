const express = require('express');
const bookingController = require('../controller/bookingConroller');
const authController = require('../controller/authController');


const router = express.Router();

router.use(authController.protect);

router.route('/')
       .get(bookingController.getBookings)
       .post(bookingController.createBookings);

router.route('/:id')
       .get(bookingController.getBookingsById);       

   
       
module.exports = router;       