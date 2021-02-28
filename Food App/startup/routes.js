
const express = require('express')
const users = require('../routes/users')
const resturants = require('../routes/resturants')
const genres = require('../routes/genres')
const auth = require('../routes/auth')
const middlewereauth = require("../middlewere/auth")



// const corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

//app.use(cors())

module.exports = function(app) {
    try{
    app.use(express.json());
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });    
}
catch(e){
    console.error("there was an error iun the first chapter of routes")
}
    app.use('/api/users', users);
    app.use('/api/resturants', resturants);
    app.use('/api/auth', auth);
    app.use('/api/genres', genres);
}