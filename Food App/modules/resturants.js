const mongoose = require('mongoose')
const Joi = require('joi')
const {dishSchema} = require('./dishes.js')
const {genersSchema} = require('../modules/geners')



const resturantsSchema = new mongoose.Schema({
    title:String,
    location:String,
    menu:[Object],
    rate:{
        type:Number,
        default:5
    },
    genres:[genersSchema] 
  })


  //sopuse to return the rate of a resturant by avg the dishes rate
  resturantsSchema.methods.updateRate = function(){
  this.rate = (this.menu.map((dish)=> dish).reduce((sum,rate)=>sum+rate))/this.menu.length
  return this
    }
  
  const Resturant = mongoose.model('Resturant', resturantsSchema)
  

  function validteResturant(resturnat) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(resturnat, schema);
  }

  function validteRateUpdate(resturnat) {
    const schema = {
      rate: Joi.string().min(3).required()
    };
  
    return Joi.validate(resturnat, schema);
  }

  exports.Resturant = Resturant;
  exports.validteResturant = validteResturant;
  exports.validteRateUpdate = validteRateUpdate;
  exports.resturantsSchema = resturantsSchema