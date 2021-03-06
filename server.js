const mongoose = require('mongoose');
const dotenv = require('dotenv');



//dotenv.config({path:'./config.env' });
dotenv.config({ path: './config.env' });
const app = require('./app');


/*
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
*/

//const DB = process.env.DATABASE_LOCAL;


mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>console.log('DB connected successfull!'));


const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
//const server