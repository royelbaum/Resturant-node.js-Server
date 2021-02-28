const mongoose = require('mongoose')
const Joi = require('joi')


const dishRateSchema = new mongoose.Schema({
    rate:{
      type:Number,
      min:0,
      max:10
    },
    user:new mongoose.Schema({
        email:String
    })
  })
  
  const DishRate = mongoose.model('DishRate', dishRateSchema)
  

  function validateDishRate(dishrate) {
    const schema = {
    };
  
    return Joi.validate(dishrate, schema);
  }

  exports.DishRate = DishRate;
  exports.validatevalidateDishRate = validateDishRate;
  exports.dishRateSchema = dishRateSchema