const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const user_routes = require('./routes/users');
const mood_routes = require('./routes/mood')

require('dotenv').config();

const app = express();
app.use(express.static('app'));
app.use(express.json({limit: '1mb'}));
app.use('/user', user_routes);
app.use('/mood', mood_routes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening to port ${port}`));
