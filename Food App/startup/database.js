const mongoose = require('mongoose')



// can use winston to log the info of connectiong the database
module.exports = function(){
    mongoose.connect('mongodb://localhost/FoodApp',{
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
    .then(() => console.log("Connect do MongoDB..."))
}