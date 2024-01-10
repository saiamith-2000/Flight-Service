const {AirplaneRepository}=require('../repositories');
const {StatusCodes}=require('http-status-codes');
const { AppError } = require('../utils/errors/app-error');

const airplaneRepository=new AirplaneRepository();

async function createAirplane(data){
    try{
       const airplane=await airplaneRepository.create(data);
       return airplane;
    } catch(error){
        if(error.name=='SequelizeValidationError'){
            let explaination=[];
            error.errors.forEach((err) => {
                explaination.push(err.message);
            })
            throw new AppError(explaination,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airplance object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getAirplanes(){
    try {
        const airplanes=await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError('Can\'t fetch data of all airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id){
    try {
        const airplane=await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
         throw new AppError('Airplane requested is not found',StatusCodes.NOT_FOUND);
        }
        throw new AppError('Can\'t find the airplane',StatusCodes.BAD_REQUEST);
    }
}


async function destroyAirplane(id){
    try {
        const response=await airplaneRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('Airplane requested is not found',StatusCodes.NOT_FOUND);
           }
           throw new AppError('Can\'t find the airplane',StatusCodes.BAD_REQUEST);
    }
}



module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane
}