const mongoose = require('mongoose')
const Joi = require('joi')
const { userRateSchema } = require('./userRate');

// needed for the profile
const postSchema = new mongoose.Schema({
   
})
  
  const Post = mongoose.model('Post', postSchema)
  

  function validatePost(post) {
    const schema = {
      postname: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(1024).required()
    };
  try{
      return Joi.validate(post, schema);
  }
  catch(e) {
      console.error("Someting has happened: ",)
  }
  }

  exports.Post = Post;
  exports.validatePost = validatePost;
  exports.postSchema = postSchema