const Category = require('../models/categorymodel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');

exports.createCategory = factory.createOne(Category);

exports.getCategory = factory.getAll(Category);