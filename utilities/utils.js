//Get the connection to Heroku Database
let db = require('./sql_conn.js');
//We use this create the SHA256 hash
const crypto = require("crypto");
var nodemailer = require('nodemailer');

function sendEmail(receiving, subject, message)
{
    console.log("Message: " + message);


    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'gennaro.corwin@ethereal.email', // generated ethereal user
            pass: 'pNrESCVmdNX2BpHUVx', // generated ethereal password
        },
    });

            var mailOptions = {
                sending: 'gennaro.corwin@ethereal.email',
                to: receiving,
                subject: subject,
                text: message
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent.');
                }
            });

}

function getHash(pw, salt) {
    return crypto.createHash("sha256").update(pw + salt).digest("hex");
}

module.exports = {
    db, getHash, sendEmail
};