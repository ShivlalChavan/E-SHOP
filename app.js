const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routers/userRoutes');
const categoryRouter = require('./routers/categoryRoutes');
const bookRouter = require('./routers/bookRoutes');
const bookingRouter = require('./routers/bookingRoutes');
const path = require('path'); //inbuild pakage

const app = express();


app.use(express.static(path.join(__dirname, 'image/books')));
// 1 Middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());

app.use((req,res, next) => {
   req.requestTime = new Date().toISOString();
   next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/book', bookRouter);
app.use('/api/v1/bookings',bookingRouter);

module.exports = app;