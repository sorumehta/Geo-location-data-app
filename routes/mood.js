const express = require('express');
const router = express.Router();
const mood_db = require('../models/mood');
const check_auth = require('../middlewares/check_auth');

router.post('/', check_auth, (request, response, next) => {
    console.log('I got a request');
    const request_data = request.body;
    const user_data = {user: request.user_data.username};
    const data = {...user_data, ...request_data};
    
    const timestamp = Date.now();
    data.timestamp = timestamp;
    mood_db.insert(data);
    response.status(200).json({
        message: "Data inserted"
    });

});

router.get('/', check_auth, (request, response, next) => {
    
    mood_db.find({user: request.user_data.username}, (err, data) => {
        if (err){
            response.status(500).json({
                message: "Error while fetching all data"
            })
            return;
        }
        response.json(data);
    });
});

module.exports = router;