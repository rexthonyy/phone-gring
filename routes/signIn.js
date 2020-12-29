const express = require("express");
const router = express.Router();
const User = require('../models/users');

// Sign in authentication
router.get('/', (req, res) => {
    User.findOne({ email: req.query.email, password: req.query.password }, '_id', (err, doc) => {
        if(err) {
            res.json(err);
        } 
        if(doc == null){
            res.json({ status: 'failed', error: 'Login credentials incorrect'});
        }else{
            res.json({ status: 'success', id: doc._id });
        }
    });
});

module.exports = router;