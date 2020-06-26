const Database = require('nedb');
const mood_db = new Database({filename: 'mood.db', autoload: true});

module.exports = mood_db;