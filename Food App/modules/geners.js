const mongoose = require('mongoose')
const Joi = require('joi')


const genersSchema = new mongoose.Schema({
    name:String
  })
  
  const Genre = mongoose.model('Genre', genersSchema)
  

  function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(2).required()
    };
  
    return Joi.validate(genre, schema);
  }

  exports.Genre = Genre;
  exports.validateGenre = validateGenre;
  exports.genersSchema = genersSchema