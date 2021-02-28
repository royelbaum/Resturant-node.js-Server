const mongoose = require('mongoose')
const Joi = require('joi')
const { userRateSchema } = require('./userRate');
const {postSchema} = require('./posts')
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    userId:{
        type:Number,
        default: -1
  },
    timestamp:{
        type:Date,
        default: Date.now()
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
    
})