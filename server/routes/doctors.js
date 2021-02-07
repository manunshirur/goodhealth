const express = require("express");
const router = express.Router();
const connection = require("../app.js").connection;
const {ensureAuthenticated} = require("../config/auth");

// List all the Doctors
router.get("/", ensureAuthenticated, (req, res) => {
    let query = "SELECT * FROM doctor";
    connection.query( query, function (error, results, fields) {
        if (error) 
            res.render("error"); 
        else
            res.render("doctors/all_doctors", {res:results});
    });
});


// Details of a Doctor
router.get("/enquiry/:name/:ssn", ensureAuthenticated, (req, res) => {
    let name = req.params.name;
    let ssn = req.params.ssn;
    let query = `SELECT * FROM doctor 
            WHERE name = '${name}' AND ssn= '${ssn}'`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.render("error");
        else
            res.render("doctors/all_doctors", {res:results});
    });
});

// Add a Doctor (GET)

router.get("/add", ensureAuthenticated,  (req, res) => {
    res.render("doctors/add_doctor");
});

// Add a Doctor (POST)

router.post("/add", ensureAuthenticated, (req, res) => {
    let {ssn, name, specialty, yearsOfExperience} = req.body;

    let query = `INSERT INTO doctor VALUES \
            ('${ssn}','${name}','${specialty}','${yearsOfExperience}')`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.render("error");
        else {
            req.flash("doctor_add_success_msg", "Doctor Added Successfully!!!");
            res.redirect("/doctors/add");
        }
    });
});


// Delete a Doctor (GET)
router.get("/delete", ensureAuthenticated, (req, res) => {
    let query = "SELECT * FROM doctor";
    connection.query( query, function (error, results, fields) {
        if (error) 
            res.render("error");
        else
            res.render("doctors/delete_doctors", {res:results});
    });
});

router.get("/delete/:ssn", ensureAuthenticated, (req, res) => {
    let { ssn } = req.params;
    let query = `DELETE FROM doctor WHERE ssn= '${ssn}'`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.render("error");
        else {
            req.flash("doctor_delete_success_msg", "Doctor Deleted Successfully!!!");
            res.redirect("/doctors/delete");
        }
    });
});

module.exports = router;