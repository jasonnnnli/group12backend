const express = require('express');
const db = require('../utilities/sqlconn.js');

var router = express.Router();

const bodyParser = require("body-parser");
//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());

router.post("/addfeature", (req, res) => {

    let Devicename = req.body['Devicename'];
    let featurecontent = req.body['featurecontent'];


    if (Username && Devicename && Reviewcontent && Rating) {
        db.none("INSERT INTO feature VALUES ($1, $2)", [ Devicename, featurecontent])
            .then(() => {
                //We successfully added the course, let the user know
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