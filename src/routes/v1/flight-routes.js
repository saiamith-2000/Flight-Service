const  express=require('express');

const { FlightController }=require('../../controllers');
const { FlightMiddlewares }=require('../../middlewares');

const router=express.Router();


router.post('/',
FlightMiddlewares.validateCreateRequest,
FlightController.createFlight);


router.patch('/:id',
FlightMiddlewares.validateUpdateRequest,
FlightController.updateFlight);


module.exports=router;