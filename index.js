//express is the framework we're going to use to handle requests
const express = require('express');
//Create a new instance of express
const app = express();

const bodyParser = require("body-parser");
//This allows parsing of the body of POST requests, that are encoded in JSON
app.use(bodyParser.json());

//pg-promise is a postgres library that uses javascript promises
const pgp = require('pg-promise')();
//We have to set ssl usage to true for Heroku to accept our connection
pgp.pg.defaults.ssl = true;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
//Create connection to Heroku Database
let db = pgp(process.env.DATABASE_URL);

if(!db) {
   console.log("Please make sure that postgres is an addon!");
   process.exit(1);
}

/*
 * Hello world functions below...
 */
/** TO DO */


app.use('/login', require('./routes/login.js'));
let middleware = require('./utilities/middleware');
app.use('/register', require('./routes/register.js'));
app.use('/', require('./routes/adddevice.js'));
app.use('/', require('./routes/listdevice.js'));
app.use('/', require('./routes/listreview.js'));
app.use('/', require('./routes/addreview.js'));
app.use('/', require('./routes/loginusername.js'))
app.use('/', require('./routes/changepassword.js'))
app.use('/', require('./routes/listfeature.js'));
app.use('/', require('./routes/addfeature.js'));


app.get("/wait", (req, res) => {
    setTimeout(() => {
        res.send({
            message: "Thanks for waiting"
        });
    }, 1000);
});
/*
 * Return HTML for the / end point. 
 * This is a nice location to document your web service API
 * Create a web page in HTML/CSS and have this end point return it. 
 * Look up the node module 'fs' ex: require('fs');
 */
app.get("/", (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    for (i = 1; i < 7; i++) {
        //write a response to the client
        res.write('<h' + i + ' style="color:#0000ff">Hello World!</h' + i + '>');
    }
    res.end(); //end the response
});

/* 
* Heroku will assign a port you can use via the 'PORT' environment variable
* To accesss an environment variable, use process.env.<ENV>
* If there isn't an environment variable, process.env.PORT will be null (or undefined)
* If a value is 'falsy', i.e. null or undefined, javascript will evaluate the rest of the 'or'
* In this case, we assign the port to be 5000 if the PORT variable isn't set
* You can consider 'let port = process.env.PORT || 5000' to be equivalent to:
* let port; = process.env.PORT;
* if(port == null) {port = 5000} 
*/ 
app.listen(process.env.PORT || 5000, () => {
    console.log("Server up and running on port: " + (process.env.PORT || 5000));
});