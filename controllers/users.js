const CryptoJS = require("crypto-js");
const users_db = require('../models/users');
const jwt = require('jsonwebtoken');

module.exports.user_signin = (req, res, next) => {
    users_db.find({
        username: req.body.username
    }, function (err, docs) {
        if (docs.length < 1) {
            console.log("User does not exist in db");
            return res.status(401).json({
                // TODO: return only Auth failed
                message: "Auth failed due to no user"
            });
        } else {            
            const correct_bytes = CryptoJS.AES.decrypt(docs[0].password, process.env.CIPHER_KEY);
            const correct_password = correct_bytes.toString(CryptoJS.enc.Utf8);
            if (req.body.password === correct_password){
                const token = jwt.sign({
                    username: docs[0].username,
                    id: docs[0]._id
                }, process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    // passing home page url as response data, with token
                    //url: "/new_entry.html", 
                    url: "/mood_index.html",
                    token: token
                });
            } else {
                // TODO: return only Auth failed
                return res.status(401).json({
                    message: "Auth failed due to wrong password"
                });
            }
        }
    });
}

module.exports.user_signup = (req, res, next) => {
    users_db.find({
        username: req.body.username
    }, function (err, docs) {
        if (docs.length > 0) {
            return res.status(409).json({
                message: "User already exists"
            });
        } else {
            const cipher_pass = CryptoJS.AES.encrypt(req.body.password, process.env.CIPHER_KEY).toString();
            users_db.insert({
                username: req.body.username,
                password: cipher_pass
            }, (er, docs) => {
                if (er) {
                    console.log("Uh oh.. Could not insert to db", er);
                    return res.status(500).json({
                        error: er
                    });
                } else {
                    console.log("Inserted to the database!");
                    return res.status(201).json({
                        message: 'user created!'
                    });
                }
            });
        }


    });
}