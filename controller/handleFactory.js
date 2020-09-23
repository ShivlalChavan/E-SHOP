const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.createOne = Model => 
    catchAsync(async(req,res,next) => {
       const doc =  await Model.create(req.body);

       res.status(201).json({
            status: 'success',
            data:{
                data:doc
            }
       });
    });

exports.getAll = Model =>
   catchAsync(async(req,res,next) =>{

    const doc = await Model.find();

    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
          data: doc
        }
      });
   }); 
   
   exports.getById = Model =>
     catchAsync(async(req,res,next)=>{
      
      let filter = {};
    if (req.params.id) filter = { user: req.params.id };

     // const doc = await Model.find(filter);
     
      const features = new APIFeatures(Model.find(filter), req.query)
      .filter(); 

      const doc = await features.query;

      if(!doc){
        return next(new AppError('No order found with that ID', 404));
      } 

      res.status(201).json({
        status:'success',
         result:doc.length,
         data:{
           data:doc
         }
      });
     });

   exports.UpdateOne = Model => 
     catchAsync(async(req,res,next) => {
         
     const doc = await Model.findByIdAndUpdate(req.params.id , req.body,{
       new:true,
       runValidators: true
     });
     
       if(!doc){
         return (new AppError('No document found with Id', 404));
       }

       res.status(200).json({
          status:'succes',
          data:{
            data:doc
          }
       });

     });