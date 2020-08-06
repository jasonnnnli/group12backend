const express = require('express');
const db = require('../utilities/sqlconn.js');

var router = express.Router();

const bodyParser = require("body-parser");
//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());

router.post("/adddevices", (req, res) => {
    let Devicename = req.body['Devicename'];
    let Decicedetail = req.body['Decicedetail'];

    if (Devicename && Decicedetail) {
        db.none("INSERT INTO devices VALUES ($1, $2)", [Devicename, Decicedetail])
            .then(() => {
                res.send({
                    success: true
                });
            }).catch((err) => {
            //log the error
            console.log(err);
            res.send({
                success: false,
                error: err
            });
        });
    } else {
        res.send({
            success: false,
            input: req.body,
            error: "Missing required information"
        });
    }
});


module.exports = router;