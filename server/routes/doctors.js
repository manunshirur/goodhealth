const express = require("express");
const router = express.Router();
const connection = require("../app.js").connection;
const {ensureAuthenticated} = require("../config/auth");

// List all the Doctors
router.get("/", (req, res) => {
    query = "SELECT * FROM doctor";
    connection.query( query, function (error, results, fields) {
        if (error) 
            throw error;
        else
            res.render("doctors/all_doctors", {res:results});
    });
});


// Details of a Doctor
router.get("/enquiry/:name/:ssn", (req, res) => {
    let name = req.params.name;
    let ssn = req.params.ssn;
    query = `SELECT * FROM doctor 
            WHERE name = '${name}' AND ssn= '${ssn}'`;
    connection.query(query, function (error, results, fields) {
    if (error) 
        throw error;
    else
        res.render("doctors/all_doctors", {res:results});
    });
});

// Add a Doctor (GET)

router.get("/add", (req, res) => {
    res.render("doctors/add_doctor");
});

// Add a Doctor (POST)

router.post("/add", (req, res) => {
    let {ssn, name, specialty, yearsOfExperience} = req.body;

    query = `INSERT INTO doctor VALUES \
            ('${ssn}','${name}','${specialty}','${yearsOfExperience}')`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            throw error;
        else {
            req.flash("doctor_add_success_msg", "Doctor added successfully");
            res.redirect("/doctors/add");
        }
    });
});


// Delete a Doctor (GET)
router.get("/delete", (req, res) => {
    query = "SELECT * FROM doctor";
    connection.query( query, function (error, results, fields) {
        if (error) 
            throw error;
        else
            res.render("doctors/delete_doctors", {res:results});
    });
});

router.get("/delete/:ssn", (req, res) => {
    let { ssn } = req.params;
    query = `DELETE FROM doctor WHERE ssn= '${ssn}'`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.send("Error: "+ error);
        else {
            req.flash("doctor_delete_success_msg", "Doctor deleted successfully");
            res.redirect("/doctors/delete");
        }
    });
});

module.exports = router;