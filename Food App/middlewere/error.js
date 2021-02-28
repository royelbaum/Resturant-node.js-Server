const winston =  require('winston')
require('winston-mongodb')

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({filename:'logging.log'})
    ]
});


module.exports = function(err,req, res, next){
    
    

}