const {FlightRepository}=require('../repositories');
const {StatusCodes}=require('http-status-codes');
const { AppError } = require('../utils/errors/app-error');

const flightRepository=new FlightRepository();

async function createFlight(data){
    try{
       const flight=await flightRepository.create(data);
       return flight;
    } catch(error){
        if(error.name=='SequelizeValidationError'){
            let explaination=[];
            error.errors.forEach((err) => {
                explaination.push(err.message);
            })
            throw new AppError(explaination,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateFlight(id,data){
    try {
        const response=await flightRepository.update(id,data);
        return response;
    } catch (error) {
        if(error.name=='SequelizeValidationError'){
            let explaination=[];
            error.errors.forEach((err) => {
                explaination.push(err.message);
            })
            throw new AppError(explaination,StatusCodes.BAD_REQUEST);
        }
        else if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('Flight requested is not found',StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot update the requested flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports={
    createFlight,
    updateFlight
}