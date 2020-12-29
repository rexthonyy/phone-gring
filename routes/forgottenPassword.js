const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Verification = require('../models/verification');

router.get('/', checkExpiredCode, (req, res) => {
    //check user is signed up
    User.findOne({ email: req.query.email }, '_id', (err, doc) => {
        if(err) {
            res.json(err);
        } 
        if(doc == null){
            res.json({ status: 'failed', error: 'Email is not signed up'});
        }else{
            Verification.find({ type: 'forgottenPassword', email: req.query.email }, '_id', (err, doc) => {
                if(err) {
                    res.json(err);
                }
                if(doc != null){
                    //delete the duplicate emails
                    doc.forEach(element => {
                        element.remove();
                    });
                }

                //Create code
                let code = Math.floor(getRandom(100000, 999999));

                //Send email
                console.log("Send email with code " + code);
            });
        }
    });
});

function checkExpiredCode(req, res, next) {
    Verification.find({ }, 'expire', (err, doc) => {
        if(err) {
            res.json(err);
        }
        if(doc != null){
            //delete expired emails
            doc.forEach(element => {
                let expire = element.expire;
                let now = Date.now();
                let expirationTime = 1000 * 60 * 30;

                if(now > (expire + expirationTime)){
                    console.log("Removed expired verification item");
                    element.remove();
                }
            });
        }
    });

    next();
}

function getRandom(min, max){
	return myMap(Math.random(), 0, 1, min, max);
}

module.exports = router;