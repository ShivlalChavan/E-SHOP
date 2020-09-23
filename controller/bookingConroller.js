const Book = require('../models/bookModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');
const Booking = require('../models/bookingModel');
const express = require('express');



// exports.createBookings = catchAsync(async(req,res,next) =>{
    
//     var bookingdata = [];
//     var count =1;
    
//     req.body.forEach(async function(obj,callback){
        
//         const  booking = await Booking.create(obj);

//         //console.log('booking obj-'+bookingdata);
//          bookingdata.push(booking);
         
//         console.log('booking saved-'+bookingdata);
//         return bookingdata;
//     });

//     const list = await Promise.all(bookingdata);

//     res.status(201).json({
//         status: 'success',
//         data:{
//             data:list
//         }
//    });
// });


exports.createBookings = catchAsync(async(req,res,next) =>{
    
    var bookinglist=[];

    try{

        await Promise.all(req.body.map(async(object)=>{
            
            const booking = await Booking.create(object);

            bookinglist.push(booking);

        }))

        res.status(201).json({
                status: 'success',
                data:{
                  data:bookinglist
                }
             });

    }catch (err){
          console.log('error-'+err);
    }

  
});


exports.getBookings = factory.getAll(Booking);

exports.getBookingsById = factory.getById(Booking);