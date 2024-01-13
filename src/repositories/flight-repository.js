const CRUDRepository=require('./crud-repository');

const { Flight }=require('../models');


class FlightRepository extends CRUDRepository{
    constructor(){
        super(Flight);
    }
}

module.exports=FlightRepository;