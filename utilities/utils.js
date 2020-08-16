//Get the connection to Heroku Database

let db = require('./sqlconn.js');

//We use this create the SHA256 hash
const crypto = require("crypto");
const nodemailer = require("nodemailer");

/**
 * Jsonwebtoken used for creating tokens/verifying
 */
const jwt = require("jsonwebtoken");
config = {
    secret: process.env.JSON_SECRET
};
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_AUTH
    }
});
function sendEmail(from, receiver, subj, textMessage/*, htmlMessage*/) {
    let mailOptions = {
        from: from,
        to: receiver,
        subject: subj,
        text: textMessage/*,
        html: htmlMessage*/
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}//TODO: Really Tyler? Abstract this out bruh... or just use sendEmail
function sendChangePasswordEmail(receiver, first, last) {
    let token = jwt.sign({email: receiver},
        config.secret,
        {
            expiresIn: '1H' // expires in 1 hours
        }
    );
    const subj = "Griffin Change Password Request";

    // Nodemailer sends user verification link
    let emailText = "Dear " + first + " " + last + ",\n\nSomebody has requested that the password"
        + " tied to this email be changed. If this was not you, please contact support as your account may"
        + " have been compromised!\n"
        + "Please click on the following link to continue with the password change request"
        + "; the link will expire in 1 hour.\n";

    //TODO: needs splash page
    let passwordChangeLink = "https://team12-services-backend.herokuapp.com/support?mode=r&name=" + token;

    // let recoveryLink = "http://localhost:5000/support?name=" + token;
    // let emailHtml = emailText + '<a href="' + recoveryLink + token + '"><H2>Verification link</H2></a>';
    emailText = emailText + passwordChangeLink;
    sendEmail(process.env.EMAIL_SENDER, receiver, subj,
        emailText);
}

/**
 * Method to get a salted hash.
 * We put this in its own method to keep consistency
 * @param {string} pw the password to hash
 * @param {string} salt the salt to use when hashing
 */
function getHash(pw, salt) {
    return crypto.createHash("sha256").update(pw + salt).digest("hex");
}

module.exports = {
    pool, getHash, sendChangePasswordEmail,
};