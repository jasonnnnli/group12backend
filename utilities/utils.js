let db = require('./sql_conn.js');
const crypto = require("crypto");
var nodemailer = require('nodemailer');

function sendEmail(receiving, subject, message)
{
    console.log("Message: " + message);


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jasonnnnli1997@gmail.com',
            pass: '97102401a.'
        }
    });

            var mailOptions = {
                sending: 'jasonnnnli1997@gmail.com',
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