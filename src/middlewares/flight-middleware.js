const {StatusCodes}=require('http-status-codes');

const { ErrorResponse }=require('../utils/common');
const { AppError } = require('../utils/errors/app-error');
const compareTime = require('../utils/helpers/datetime-helpers');

function validateCreateRequest(req, res,next){
    if(!req.body.flightNumber){
          ErrorResponse.message="Something went wrong while creating flight";
          ErrorResponse.error=new AppError(['flight number found in incorrect form'],StatusCodes.BAD_REQUEST);
          return res.status(StatusCodes.BAD_REQUEST).json({ErrorResponse});
    }
    if(!req.body.airplaneId){
        ErrorResponse.message="Something went wrong while creating flight";
        ErrorResponse.error=new AppError(['airplaneId found in incorrect form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ErrorResponse});
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message="Something went wrong while creating flight";
        ErrorResponse.error=new AppError(['departure Airport Id found in incorrect form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ErrorResponse});
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message="Something went wrong while creating flight";
        ErrorResponse.error=new AppError(['arrival Airport Id found in incorrect form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ErrorResponse});
  }
  if(!req.body.arrivalTime){
      ErrorResponse.message="Something went wrong while creating flight";
      ErrorResponse.error=new AppError(['arrival time found in incorrect form'],StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json({ErrorResponse});
  }
  if(!req.body.departureTime){
      ErrorResponse.message="Something went wrong while creating flight";
      ErrorResponse.error=new AppError(['departure time Id found in incorrect form'],StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json({ErrorResponse});
  }
  if(!req.body.price){
    ErrorResponse.message="Something went wrong while creating flight";
    ErrorResponse.error=new AppError(['price found in incorrect form'],StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json({ErrorResponse});
}
if(!req.body.totalSeats){
  ErrorResponse.message="Something went wrong while creating flight";
  ErrorResponse.error=new AppError(['total seats found in incorrect form'],StatusCodes.BAD_REQUEST);
  return res.status(StatusCodes.BAD_REQUEST).json({ErrorResponse});
}
if(!compareTime(req.body.arrivalTime,req.body.departureTime)){
    ErrorResponse.message="Something went wrong while creating flight";
    ErrorResponse.error=new AppError(['Arrival time should be greater than departure time'],StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json({ErrorResponse});
  }
    next();
}

function validateUpdateRequest(req,res,next){
    if(!req.body.name && !req.body.code && !req.body.cityId){
        ErrorResponse.message="Something went wrong while updating Airport";
        ErrorResponse.error=new AppError(['Name,Code and City Id not found in incoming form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ErrorResponse});
  }
  next();
}

module.exports={
    validateCreateRequest,
    validateUpdateRequest
}