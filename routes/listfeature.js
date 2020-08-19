const express = require('express');
const db = require('../utilities/sqlconn.js');

var router = express.Router();

const bodyParser = require("body-parser");
//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());
router.get("/feature", (req, res) => {

    db.manyOrNone('SELECT Devicename,featurecontent FROM feature')
        //If successful, run function passed into .then()
        .then((data) => {
            res.send({
                success: true,
                feature: data
            });
        }).catch((error) => {
        console.log(error);
        res.send({
            success: false,
            error: error
        })
    });
});


module.exports = router;