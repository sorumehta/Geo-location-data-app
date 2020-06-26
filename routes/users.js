const express = require('express');
const router = express.Router();
const simplecrypt = require("simplecrypt");
const sc = simplecrypt();
const users_db = require('../models/users');
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res, next) => {
    users_db.find({
        username: req.body.username
    }, function (err, docs) {
        if (docs.length > 0) {
            return res.status(409).json({
                message: "User already exists"
            });
        } else {
            users_db.insert({
                username: req.body.username,
                password: sc.encrypt(req.body.password)
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
});

router.post('/signin', (req, res, next) => {
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
            
            const user_password = sc.encrypt(req.body.password);
            
            if (user_password === docs[0].password){
                const token = jwt.sign({
                    username: docs[0].username,
                    id: docs[0]._id
                }, process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    // passing home page url as response data, with token
                    url: "/new_entry.html", 
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
});

module.exports = router;