const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();
console.log(process.env);
const database = new Datastore('database.db');
database.loadDatabase();

const app = express();
app.listen(3000, () => console.log('listening to port 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));
app.post('/api', (request, response) => {
    console.log(`I got a request, ${process.env.SECRET_NAME}`);
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);

});

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err){
            response.end();
            return;
        }
        response.json(data);
    });
});
