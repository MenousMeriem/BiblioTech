const ErrorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500 
    res.status(statusCode).json({
        Message : err.message, 
        Stack: err.stack,
    })
}
module.exports = ErrorHandler 