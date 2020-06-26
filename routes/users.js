const express = require('express');
const router = express.Router();
const simplecrypt = require("simplecrypt");
const sc = simplecrypt();
const users_db = require('../models/users');

router.post('/signup', (req, res, next) => {
    let valid_user = true;
    users_db.find({
        username: req.body.username
    }, function (err, docs) {
        if (docs.length > 0) {
            valid_user = false;
            console.log("Valid user is now false");
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

module.exports = router;