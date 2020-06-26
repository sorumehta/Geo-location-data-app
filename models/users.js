const Database = require('nedb');
const users_db = new Database({filename: 'users.db', autoload: true});

module.exports = users_db;