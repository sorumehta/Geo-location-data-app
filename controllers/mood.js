const mood_db = require('../models/mood');

module.exports.get_all_moods = (request, response, next) => {
    console.log('I got a GET request');
    mood_db.find({user: request.user_data.username}, (err, data) => {
        if (err){
            response.status(500).json({
                message: "Error while fetching all data"
            })
            return;
        }
        response.json(data);
    });
}

module.exports.post_new_mood = (request, response, next) => {
    console.log('I got a POST request');
    const request_data = request.body;
    const user_data = {user: request.user_data.username};
    const data = {...user_data, ...request_data};
    
    const timestamp = Date.now();
    data.timestamp = timestamp;
    mood_db.insert(data);
    response.status(200).json({
        message: "Data inserted"
    });

}