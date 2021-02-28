const mongoose = require('mongoose')
const Joi = require('joi')
const {dishRateSchema} = require('./dishRate')


const dishSchema = new mongoose.Schema({
    name:String,
    ingridiants:[String],
    price:{
      type:Number,
      default:-1
    },
    rate:{
      type:Number,
      default:5
    },
    usersrate:[dishRateSchema]
  })

  // need to check this method + this is how you insert a method to object

  dishSchema.methods.updateRate = function(){
    let sum=0
    for(let i=0; i<this.usersrate.length;i++){
      sum+=this.usersrate[i].rate
    }
    return sum/usersrate.length
  }

  const Dish = mongoose.model('Dish', dishSchema)
  
  

  function validateDish(dish) {
    const schema = {
      name: Joi.string().min(2).required()
    };
  
    return Joi.validate(dish, schema);
  }

  exports.Dish = Dish;
  exports.validateDish = validateDish;
  exports.dishSchema = dishSchema