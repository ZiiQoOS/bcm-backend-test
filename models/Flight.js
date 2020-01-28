class Flight {
    constructor(provider, price, departure_time, arrival_time) {
        this.provider = provider;
        this.price = price;
        this.departure_time = departure_time;
        this.arrival_time = arrival_time;
    }
}

module.exports = Flight;
