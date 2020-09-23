const mongoose = require('mongoose');
const slugify = require('slugify');


const categorySchema = new mongoose.Schema(
  {
    categoryName:{
        type:String,
        required:[true,'A category must have a name'],
        trim:true,
    }
  }
);

const Category = mongoose.model('Category',categorySchema);
module.exports = Category;
