const mongoose = require('mongoose')
const Joi = require('joi')


const userRateSchema = new mongoose.Schema({
    rate:Number,
    resturant:new mongoose.Schema({
        name:String
    }),
    dish:new mongoose.Schema({
        name:{
            type:String
        },
        ingridiants:{
            type:[String]
        }
    })
  })
  
  const UserRate = mongoose.model('UserRate', userRateSchema)
  

  function validateUserRate(userrate) {
    const schema = {
      rate: Joi.number().min(0).required()
    };
  
    return Joi.validate(userrate, schema);
  }

  exports.UserRate = UserRate;
  exports.validateUserRate = validateUserRate;
  exports.userRateSchema = userRateSchema