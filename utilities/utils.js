//Get the connection to Heroku Database

let db = require('./sqlconn.js');

//We use this create the SHA256 hash
const crypto = require("crypto");
const nodemailer = require("nodemailer");
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
/**
 * Sends an email via Nodemailer
 * @param from {String} email address of sender (Nodemailer will auto set to gmail account mail)
 * @param receiver {String} email address of recipient
 * @param subj {String} subject line
 * @param textMessage {String} email body text
 */
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
}
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
function sendEmail(from, receiver, subj, message) {
    //research nodemailer for sending email from node.
    // https://nodemailer.com/about/
    // https://www.w3schools.com/nodejs/nodejs_email.asp
    //create a burner gmail account
    //make sure you add the password to the environmental variables
    //similar to the DATABASE_URL and PHISH_DOT_NET_KEY (later section of the lab)

    //fake sending an email for now. Post a message to logs.
    console.log('Email sent: ' + message);
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
    db, getHash, sendEmail,sendChangePasswordEmail
};