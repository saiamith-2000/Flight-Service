const {StatusCodes}=require('http-status-codes');

const { ErrorResponse }=require('../utils/common');
const { AppError } = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message="Something went wrong during creating city";
        ErrorResponse.error=new AppError(['City name can\'t be null'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ErrorResponse});
  }
  next();
}

module.exports={
    validateCreateRequest
}