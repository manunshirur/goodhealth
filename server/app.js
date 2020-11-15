const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
// const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const cors = require('cors');

// Creating Connection only once and shared among all the routes
module.exports = {
  connection: require("./config/keys.js").connect_to_mysql()
};

const app = express();
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000;

// Passport config
require("./config/passport")(passport);

// DB URI
const db = require("./config/keys").MongoURI;

// DB Connection
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected"))
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(cors());

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
    res.locals.doctor_add_success_msg = req.flash("doctor_add_success_msg");
    res.locals.doctor_delete_success_msg = req.flash("doctor_delete_success_msg");
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
app.use("/doctors", require('./routes/doctors')); 
app.use("/prescriptions", require('./routes/prescriptions')); 
app.use("/drugs", require('./routes/drugs')); 
app.use("/contracts", require('./routes/contracts')); 

app.listen(PORT, console.log(`Server started on port ${PORT}`));