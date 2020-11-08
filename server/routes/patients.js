const express = require("express");
const router = express.Router();
const connection = require("../app.js").connection;
const {ensureAuthenticated} = require("../config/auth");

// List all the Patients
router.get("/", (req, res) => {
    query = "SELECT * FROM pri_phy_patient";
    connection.query( query, function (error, results, fields) {
        if (error) 
            throw error;
        else
            res.send(results);
    });
});

// List all the Prescriptions
router.get("/prescriptions", (req, res) => {
    query = `SELECT patient.name, patient.ssn, 
            pre.phy_ssn, pre_date, quantity, trade_name, pharm_co_name 
            FROM pri_phy_patient patient 
            LEFT JOIN prescription pre ON patient.ssn = pre.ssn`;
    connection.query(query, function (error, results, fields) {
    if (error) 
        throw error;
    else
        res.send(results);
    });
});

// List the presciptions of a specific Patient
router.get("/enquiry/:name/:birthDate", (req, res) => {
    let name = req.params.name;
    let birthDate = req.params.birthDate;
    query = `SELECT patient.name 'Patient Name',patient.ssn as 'Patient SSN', 
            pre.phy_ssn, pre_date, pre.status, quantity, trade_name, pharm_co_name 
            FROM pri_phy_patient patient 
            JOIN prescription pre ON patient.ssn = pre.ssn
            WHERE patient.name = '${name}' AND patient.birth_date= '${birthDate}'`;
    connection.query(query, function (error, results, fields) {
    if (error) 
        throw error;
    else
        res.send(results);
    });
});

// Add a Patient
router.post("/add", (req, res) => {
    let {ssn, name, birth_date, address, phy_ssn} = req.body;
    query = `INSERT INTO pri_phy_patient VALUES \
            ('${ssn}','${name}','${birth_date}','${address}','${phy_ssn}')`;
    connection.query(query, function (error, results, fields) {
    if (error) 
        throw error;
    else
        res.send(results);
    });
});


// Delete a Patient
router.delete("/delete/:name/:birthDate", (req, res) => {
    console.log(`${req.params.name}`);
    query = `DELETE FROM pri_phy_patient patient 
            WHERE patient.name = '${req.params.name}' AND patient.birth_date= '${req.params.birthDate}'`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.send("Error: "+ error);
        else
            res.send("Number of Rows Deleted: "+ results.affectedRows);
    });
});
module.exports = router;