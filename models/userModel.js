const mongoose = require('mongoose');
const validator  = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');  //build in module

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, 'Please tell us a name']
        },
        email:{
            type:String,
            required:[true, 'Please provide a email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email'] 
        },
        photo:String,
        role:{
            type: String,
            enum: ['user','admin'],
            default: 'user'
        },
        password:{
            type:String,
            required: [true, 'Please provide a password'],
            minlength: 8,
            select: false
        },
        confirmPassword:{
            type: String,
            required: [true ,'Please confirm your password'],
            validate:{
                validator: function(e1){
                    return e1 === this.password; //works only create , SAVE
                },
                message: 'Passwords are not same'
            }
        },
        passwordChangedAt:{
            type: Date
        },
        passwordResetToken: String,
        passwordResetExpires: Date

   }
);

//between getting data and saving in db
userSchema.pre('save', async function(next){
    // only run if password was modified 
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);  // bcrypt is to encrypt the password;

    // delete confirm password field.
    this.confirmPassword = undefined;
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
};

userSchema.methods.changedPasswordAfter = async function(JWTTimstamp){
    
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
           
       return JWTTimstamp < changedTimeStamp; // for comparing true false 
    }
    
    // Not Changed 
    return false;
}

userSchema.methods.createPasswordResetToken = function() {
   const reseToken = crypto.randomBytes(32).toString('hex');

   this.passwordResetToken = crypto.createHash('sha256').update(reseToken).digest('hex');

   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

   return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;