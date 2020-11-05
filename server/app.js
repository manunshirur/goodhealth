const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
// const oracledb = require('oracledb');
const mysql = require('mysql');

module.exports = {
    connection: mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'ashu',
    database : 'goodhealth'
  })
};

const app = express();

const PORT = process.env.PORT || 3000;

// Passport config
require("./config/passport")(passport);

// DB URI
const db = require("./config/keys").MongoURI;

// DB Connection
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected "))
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser - for parsing the form data
app.use(express.urlencoded({extended: false}));


  
// Express Session middleware
app.use(session({
    secret: 'encrypt',
    resave: true,
    saveUninitialized: true
  }));

// Passport middelware
app.use(passport.initialize());
app.use(passport.session());

 // Connect Flash
 app.use(flash());

 // Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

// Serving static files
// Options while serving static files
let options = {
    dotfiles: "ignore", // Request to access hidden files are ignored
    extensions: ["htm", "html"], // When a file is requwsted without extensions, these are added
    index: false, // it disables the directory indexing
    redirect: false // if file is not founf then we are not redirecting to the root directory
};

app.use(express.static(path.join(__dirname, "/public"), options));


// Routes
app.use("/", require('./routes/index')); 
app.use("/users", require('./routes/users')); 
app.use("/patients", require('./routes/patients')); 
app.use("/contracts", require('./routes/contracts')); 


app.listen(PORT, console.log(`Server started on  port ${PORT}`));


