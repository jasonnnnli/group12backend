//express is the framework we're going to use to handle requests
const express = require('express');

const bodyParser = require("body-parser");

//We use this create the SHA256 hash
const crypto = require("crypto");

//Create connection to Heroku Database
let db = require('../utilities/utils').db;

let getHash = require('../utilities/utils').getHash;

let sendEmail = require('../utilities/utils').sendEmail;

var router = express.Router();
router.use(bodyParser.json());

router.post('/changepassword', (req, res) => {
    var email = req.body['email'].toLowerCase();
    var password = req.body['password'];
    var code = req.body['code'];
    if (email && password && code) {
        if (!email.includes("@")) {
            res.send({
                success: false,
                error: "Email is invalid."
            })
        }
        else {
            // Select the member with the given email
            db.result(`SELECT * FROM MEMBERS
                       WHERE EMAIL= $1`, [email])
                .then(result => {
                    // Get todays date
                    var today = new Date();
                    // Get the resetcode
                    var resetcode = result.rows[0]["resetcode"];
                    // Get the expiration of the code
                    var expire = result.rows[0]["expire"];
                    if (!expire >= today) {
                        res.send({
                            success: false,
                            error: "Code expired."
                        })
                    }
                    else {
                        if (code != resetcode) {
                            res.send({
                                success: false,
                                error: "Code does not match."
                            })
                        }
                        else {
                            let salt = crypto.randomBytes(32).toString("hex");
                            let salted_hash = getHash(password, salt);
                            if (password.length < 6) {
                                res.send({
                                    success: false,
                                    error: "Password must be at least 6 characters long."
                                });
                            }
                            else {

                                var params = [email, salted_hash, salt];
                                db.none(`UPDATE MEMBERS 
                                        SET Password = $2, Salt = $3, ResetCode = NULL, Expire = NULL 
                                        WHERE EMAIL = $1`, params)
                                    .then(() => {
                                        res.send({
                                            success: true
                                        });
                                        var message = "Your password has been updated.";
                                        // Send a confirmation email
                                        sendEmail(email, "Password Reset Confirmation", message);
                                    })
                            }
                        }
                    }


                })


        }
        // If the email, password or code are not given.
    } else {
        res.send({
            success: false,
            input: req.body,
            error: "Missing required user information."
        });
    }
});

module.exports = router;