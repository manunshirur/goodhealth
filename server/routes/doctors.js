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

// Add a Doctor
router.post("/add", (req, res) => {
    let {ssn, name, speciality, yearsOfExperience} = req.body;
    query = `INSERT INTO doctor VALUES \
            ('${ssn}','${name}','${speciality}','${yearsOfExperience}')`;
    connection.query(query, function (error, results, fields) {
    if (error) 
        throw error;
    else
        res.send(results);
    });
});


// Delete a Doctor
router.delete("/delete/:name/:ssn", (req, res) => {
    let {name, ssn} = req.params;
    query = `DELETE FROM doctor WHERE name = '${name}' AND ssn= '${ssn}'`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.send("Error: "+ error);
        else
            res.send("Number of Rows Deleted: "+ results.affectedRows);
    });
});

module.exports = router;