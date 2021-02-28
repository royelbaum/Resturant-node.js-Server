const {User} = require('../modules/users')

async function isadmin (req , res , next){
    const user = await User.findById(req.user._id)
    user.isAdmin ? next() : res.status(403).send("Access Denied")
    }

exports.isadmin = isadmin