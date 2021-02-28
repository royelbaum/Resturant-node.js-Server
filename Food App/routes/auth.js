const express = require('express');
const config = require('config')
const Joi = require('joi')
const _ = require('lodash')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const {User} = require('../modules/users')
const router = express.Router();



router.post('/', async (req , res) => {
 // console.log("i am in auth")

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
   // console.log("i am after first validation")
    const user = await User.findOne({email:req.body.email})
    if (!user) return res.status(400).send('Invalid Email or password.');
 //   console.log("i am after secend validation")
    const validation =  await bcrypt.compare(req.body.password, user.password)
    if(!validation) return res.status(400).send('Invalid Email or password.');
    
    const token = jwt.sign({_id:user._id}, 'jwtprivatekey')
    let resuser = {..._.pick(user,["username", "email", "_id"]), token:token}
    res.header('x-auth-token', token).send(resuser)
  //  res.header('x-auth-token', token).send(_.pick(user,["username", "email"]))
})

function validate(auth) {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    };
  
    return Joi.validate(auth, schema);
  }

module.exports = router;