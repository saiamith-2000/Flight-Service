const { Sequelize } = require('sequelize');

const CrudRepository = require('./crud-repository');
const { Flight, Airplane, Airport, City } = require('../models');
const db = require('../models');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }
    async updateRemainingSeats(flightId,seats,dec='true'){
        const flight = await Flight.findByPk(flightId);
        const numericSeats=parseInt(seats,10);
        if(dec=='true'){
            const response=await flight.decrement('totalSeats',{by: numericSeats});
            await flight.reload();
            return response
        }
        else{
            const response=await flight.increment('totalSeats',{by: numericSeats});
            await flight.reload();
            return response
        }
    }

    async getAllFlights(filter, sort) {
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetail',
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    on : {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on : {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                }
            ]
        });
        return response;
    }

}


module.exports = FlightRepository;