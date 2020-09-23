const mongoose = require('mongoose');
const Category = require('./categorymodel');
const { Double, Decimal128 } = require('mongodb');


const bookSchema = new mongoose.Schema(
 {
    title:{
        type:String,
        required:[true,'BookName should not be empty.']
    },
    authorName:{
        type:String,
        required:[true,'Book must have a author name.']
    },
    ratings:{
        type:Number,
        min:1.1,
        max:5.0,
        default:1.1
    },
    price:{
        type:Number,
        required:[true,'Book must have a price']
    },
    image:{
        type:String,
        default:'defaultbook.png'
    },
    description:{
        type:String,
        required:[true, 'Book must have a description']
    },
    pages:Number,
    status:{
          type:Boolean,
          default:false
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:[true,'Book belongs to category.']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
 },
 {
     toJSON: {virtuals: true},
     toObject: { virtuals: true}
 }
);

const Book = mongoose.model('Book',bookSchema);

module.exports = Book;