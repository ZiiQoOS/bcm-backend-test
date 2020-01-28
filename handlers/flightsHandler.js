const axios = require('axios');
const {XAPIKey} = require('../appconfig');
const {csvToJSON} = require('../helpers/converters');
const {addProviderProp} = require('../handlers/arrayHandler');
const frHandler = {
    async getProviderFlights(provider) {
        let results = [];
        const axInstance = axios.create({
            baseURL: provider.baseURL,
            headers: {'X-API-Key': XAPIKey}
        });
        try {
            const response = await axInstance.get('/flights');
            switch (response.headers['content-type']) {
                case 'text/csv':
                    results = csvToJSON(response.data);
                    break;
                case 'application/json':
                    results = response.data;
                    break;
                default :
                    return {message: "Unknown response type"};
            }
            return addProviderProp(results, provider.name.toUpperCase());
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getProidersFlights() {
        for (let array of arguments) {
            
        }
    }

};
module.exports = frHandler;