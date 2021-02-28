const winston =  require('winston')
require('winston-mongodb')

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({filename:'logging.log'})
    ]
});

//winston.add(winston.transports.File, {filename: 'logging.logs'})
module.exports = function (ex) {
    // catch all the sync errors but not async
    process.on('uncaughtException', (ex)=> {
        logger.error("Uncaught EXCEPTION" , ex)
    })
      // catch all the async errors
    process.on('unhandledRejection', (ex)=> {
        throw ex
    })
        
    }
