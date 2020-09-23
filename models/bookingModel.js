const mongoose = require('mongoose');

const bookingSchema = new  mongoose.Schema({

    book:{
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: [true, 'Order must be of book']
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true,'Order must be by user']
    },
    price:{
        type: Number,
        required: [true,'Order must have a price']
    },
    paymentId:{
        type:String,
        required:[true,'Booking should have a payment reference.']  
    },
    itemCount:{
       type:Number,
       default:1
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    paid:{
        type: Boolean,
        default: true
    }
});


bookingSchema.pre(/^find/, function(next){
    this.populate('user').populate({
        path: 'book',
        select: 'title'
    });
    next();
});


const Booking = mongoose.model('Booking',bookingSchema);

module.exports = Booking;


