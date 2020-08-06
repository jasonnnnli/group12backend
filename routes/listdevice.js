const express = require('express');
const db = require('../utilities/sqlconn.js');

var router = express.Router();

const bodyParser = require("body-parser");
//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());
router.get("/devices", (req, res) => {

    db.manyOrNone('SELECT Devicename FROM devices')
        //If successful, run function passed into .then()
        .then((data) => {
            res.send({
                success: true,
                Devices: data
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