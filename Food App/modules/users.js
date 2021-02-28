const mongoose = require('mongoose')
const Joi = require('joi')
const { userRateSchema } = require('./userRate');
const {postSchema} = require('./posts')
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        minlength:3,
        maxlength:50
  },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        minlength:6,
        maxlength:1024
    },
    livinglocation:{
      type:String,
      default:""
    },
   // ratedbyme:[userRateSchema],
    isAdmin:{
      type:Boolean,
      default:false
    },
   // post:[postSchema],
   // picture:String
    
})

userSchema.method.HashPassword = (password) =>{
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}
userSchema.method.VialidatePassword = (password) =>{
  return bcrypt.compareSync(password,this.password)
}
  
  const User = mongoose.model('User', userSchema)
  

  function validateUser(user) {
    const schema = {
      username: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(1024).required(),
      confirmPassword: Joi.string().min(6).max(1024).required()
    };
  try{
      return Joi.validate(user, schema);
  }
  catch(e) {
      console.error("Someting has happened: ",e)
  }
  }

  exports.User = User;
  exports.validateUser = validateUser;
  exports.userSchema = userSchema