const express = require('express');
const router = express.Router();
const _ = require('lodash')
const bcrypt = require("bcrypt")
const {User , validateUser} = require('../modules/users')



// need to rap with authorization
router.put('/:id', async (req , res) => {
    const { error } = validateUser(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(req.params.id, req.body , {new:true})
    if (!user) return res.status(404).send('The genre with the given ID was not found.');

    res.send(user)
})


// a function that signup a new user
router.post('/signup', async (req , res) => {
    console.log("i am in the user post")
    console.log("this is the massage body: ", req.body)
    const { error } = validateUser(req.body); 
    // changed error send is a dic ---------------- need to check if working
    if (error) return res.status(400).send({
        secsuess:false,
        massage:error.details[0].message});
    //console.log("i am after first validation")
    //changed to lower case -------------------------- need to check if working - 
    const email = await User.findOne({email:req.body.email})
    if (email) return res.status(404).send('The Email is already exists.');
    //console.log("i am after secound validation")

    let user =new User(_.pick(req.body, ['username','email','password']))
    //console.log("the new user after validation" , user)

    // bcrypt.genSalt(10).then((salt)=> {
    //     console.log("the salt: " , salt)
    //     user.password = bcrypt.hash(user.password, salt)
    //     console.log("the user password: ", user.password)})
    //                   .catch((e) => console.error("there was an error: " ,e))

    // console.log("this is the user after bycrapt" , user)

     try{
         const salt = await bcrypt.genSalt(10)
         user.password = await bcrypt.hash(user.password , salt)
     }
     catch(e){
       console.error("there is an error" , e)
    }

     user.save().then((user) =>  res.send(_.pick(user,["email","username"])))
                .catch((e) => console.error("there was an error: " ,e))


    //  try{
    //      user = await user.save();
    //      res.send(_.pick(user,["email","username"]))
    //  }
    //  catch(e){
    //      console.error("there was an error: " ,e)
    //  }
})


router.get('/:id', async (req , res) => {
    const user = await User.findOne({_id:req.params.id})
    if(!user){
        //TODO logout 
        //send an error
    }
    return res.send(_.pick(user,["_id","username"]))

})

router.delete('/:id', async (req , res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).send('The genre with the given ID was not found.');
    res.send(user)
})

module.exports = router;