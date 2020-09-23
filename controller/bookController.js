const multer = require('multer');
const sharp = require('sharp');
const category = require('../models/categorymodel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');
const Book = require('../models/bookModel');

const multerStorage = multer.memoryStorage();

const multerFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }else {
        cb(new AppError('Not a image! Please upload image.', 400),false);
    }
};

const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
});

exports.UploadBookPhoto = upload.single('image');

exports.resizeBookPhoto = catchAsync(async(req,res,next) =>{
     if(!req.file) return next();
     
     req.file.filename = `book-${req.params.id}-${Date.now()}.jpeg`;

     await sharp(req.file.buffer)
            .resize(1080,1080)
            .toFormat('jpeg')
            .jpeg({quality:90})
            .toFile(`image/books/${req.file.filename}`);  

     next();
});


const filterObj = (obj, ...allowedFields) =>{
    const newObj = {};

    Object.keys(obj).forEach(e1 => {
         if(allowedFields.includes(e1)) newObj[e1] = obj[e1];
    });
    return newObj;
};

exports.UpdateBook = catchAsync(async(req,res,next) =>{

    console.log(req.file);
    console.log(req.body);

    const filterBody = filterObj(req.body, 'price');
    if(req.file) filterBody.image = req.file.filename;

   

    const updateBook = await Book.findByIdAndUpdate(req.params.id , filterBody,{
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status:'success',
        data:{
            data:updateBook
        }
    });

});

exports.createBook = factory.createOne(Book);
exports.getAllBooks = factory.getAll(Book);
exports.updateBook = factory.UpdateOne(Book);



