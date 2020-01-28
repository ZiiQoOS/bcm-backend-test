const Flight = require('../models/Flight');
const {providers} = require('../appconfig');
const {air_beam, air_jazz, air_moon} = providers;
const moment = require('moment');

const aggregator = {
    aggregateResults() {
        let result = [];
        for (const array of arguments) {
            if (array !== undefined)
                array.forEach((flight) => {
                    switch (flight.provider) {
                        case air_beam.name:
                            result.push(new Flight(flight.provider, Number(flight.p), moment(flight.departure, 'HH:mm a').format('h:mm a'), moment(flight.arrival, 'HH:mm a').format('h:mm a')));
                            break;
                        case air_jazz.name:
                            result.push(new Flight(flight.provider, Number(flight.price), moment(flight.dtime, 'HH:mm a').format('h:mm a'), moment(flight.atime, 'HH:mm a').format('h:mm a')));
                            break;
                        case air_moon.name:
                            result.push(new Flight(flight.provider, Number(flight.price), moment(flight.departure_time, 'HH:mm a').format('h:mm a'), moment(flight.arrival_time, 'HH:mm a').format('h:mm a')));
                            break;
                        default:
                            console.error('Provider Not Found,Please add a new provider to the config file');
                    }
                });
        }
        return result;
    }
};
module.exports = aggregator;