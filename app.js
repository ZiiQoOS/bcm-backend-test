const express = require('express');
const {getProviderFlights} = require('./handlers/flightsHandler');
const {sortAndSlice} = require('./handlers/arrayHandler');
const {verifyToken} = require('./handlers/AuthHandler');
const {providers, port} = require('./appconfig');
const {air_beam, air_jazz, air_moon} = providers;
const {aggregateResults} = require('./helpers/aggregator');

const app = express();


app.get('/api/flights', async (req, res) => {

    /*
    the function verifyToken that :
    Checks the Headers of the request if it has an API_token provided by the /api/token endpoint
     */

    let authenticated = verifyToken(req.headers['API_TOKEN']);
    if (!authenticated) return res.send({error: "API Token required.  Please make sure send a valid API_TOKEN in the request headers"});
    let beamFlights = await getProviderFlights(air_beam);
    let jazzFlights = await getProviderFlights(air_jazz);
    /*
        To handle the late response and of the Air Moon provider ,
        We're going to implement the Aggregator Pattern using the Publish/Subscribe mechanism :
            1- the promises that returns the data are the publishers , when the promise gets resolved it will publish "asynchronously" a message (returned data) to a topic;
            2- the aggregator (result) will be subscribed to the same topic where the publishers publish their messages,
                with the possibility to publish the received events from sources;
            3- the target objects(the data that should be returned once its ready) will subscribe to our aggregator,that they receive the messages (data) the aggregator
                will publish.
     */
    let moonFlights = await getProviderFlights(air_moon);


    let result = aggregateResults(beamFlights, jazzFlights, moonFlights);
    result = sortAndSlice(result, 50);
    res.send({flights: result});
});

app.get('/api/token', (res, req) => {
    /*
        An end point that returns a unique token for the partners and associate it with a unique email,
        if a partner needs to use our API he need to send the unique token in the headers of his request,the purpose is to let only
        authenticated users access the endpoint

     */

    /*
    Also to limit the access to the API we are gonna associate a counter with every token generated , that increments,
    with every /api/flights endpoint call .And when it reaches the max value we send back an error response.
     */

    res.send({token: 'UNQ_TKN'})
});

/*

    if there is an overlap on the search request , we can use a load balancer to distribute the traffic across other servers,
    to decrease the number of concurrent users on the same resource.

 */

app.listen(port, () => console.log(`The app listening on port ${port}!`));