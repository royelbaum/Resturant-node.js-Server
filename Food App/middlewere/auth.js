const jwt = require('jsonwebtoken');


function auth(req , res , next){
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send('Access denied. No token provided.');

    try{
        const decoded = jwt.verify(token, 'jwtprivatekey')
        req.user= decoded
        next()
        }
catch(e) {
    res.status(404).send("Invalid Token")
        }
    }

exports.auth = auth