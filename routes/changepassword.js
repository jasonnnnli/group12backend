//TODO: Clean this class up

/**
 * Express used for https requests
 */
const express = require("express");

/**
 * Using express package routing
 */
let router = express.Router();

/**
 * sendRecoveryEmail function in utilities utilizing Nodemailer
 */
let sendChangePasswordEmail = require('../utilities/utilsss').sendChangePasswordEmail;

/**
 * Package for parsing JSON
 */
const bodyParser = require("body-parser");

/**
 * This allows parsing of the body of POST requests, that are encoded in JSON
 */
router.use(bodyParser.json());
let pool = require('../utilities/utilsss').pool;
let jwt = require('jsonwebtoken');

/**
 * Config object for jwt creation
 */
config = {
    secret: process.env.JSON_SECRET
};
router.post('/changepassword', (request, response) => {
    response.type("application/json");
    const email = request.body.email;

    let theQuery = "SELECT FirstName, LastName FROM Members WHERE Email=$1";
    let values = [email];

    pool.query(theQuery, values)
        .then(result => {
            if (result.rowCount == 0) {
                response.status(201).send({
                    acknowledge: true,
                });
                return;
            }
            let first = result.rows[0].firstname;
            let last = result.rows[0].lastname;

            //send password reset email using firstname and lastname
            sendChangePasswordEmail(email, first, last);

            response.status(201).send({
                acknowledge: true
            });
        })
        .catch((err) => {
            //unable to query, log error
            //TODO: Okay for error response here?
            response.status(400).send({
                acknowledge: false,
                message: err.detail
            });
        });
});
module.exports = router;