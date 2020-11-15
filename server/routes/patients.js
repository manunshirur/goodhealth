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
            res.render("patients/all_patients", {res:results});
    });
});

// List all the Prescriptions
router.get("/prescriptions", (req, res) => {
    query = `SELECT patient.name, patient.ssn, 
            pre.phy_ssn, d.name as doctorname, pre_date, quantity, trade_name, pharm_co_name 
            FROM pri_phy_patient patient 
            LEFT JOIN prescription pre ON patient.ssn = pre.ssn
            LEFT JOIN Doctor d ON patient.phy_ssn = d.ssn`;
    connection.query(query, function (error, results, fields) {
    if (error) 
        throw error;
    else
        res.render("patients/all_patients_prescriptions", {res:results});
    });
});

// List the presciptions of a specific Patient
router.get("/enquiry/:firstName/:lastName/:birthDate", (req, res) => {
    let firstName = req.params.firstName;
    let lastName = req.params.lastName;
    let birthDate = req.params.birthDate;
    

    query = `SELECT patient.name ,patient.ssn, 
            pre.phy_ssn, pre_date, pre.status, quantity, trade_name, pharm_co_name 
            FROM pri_phy_patient patient 
            JOIN prescription pre ON patient.ssn = pre.ssn
            WHERE patient.name = '${firstName} ${lastName}' AND '${birthDate}'`;
    connection.query(query, function (error, results, fields) {
    if (error) 
        throw error;
    else
        res.send(results);
    });
});



// Add a Patient (GET)

router.get("/add", (req, res) => {
    query = "SELECT ssn, name FROM doctor";
    connection.query( query, function (error, results, fields) {
        if (error) 
            throw error;
        else
            res.render("patients/add_patient", {res:results});
    });
});


// Add a Patient (POST)

router.post("/add", (req, res) => {
    let {ssn, name, birth_date, address, pri_phy_ssn} = req.body;

    query = `INSERT INTO pri_phy_patient VALUES \
            ('${ssn}','${name}','${birth_date}','${address}','${pri_phy_ssn}')`;
    console.log(query);            
    connection.query(query, function (error, results, fields) {
        if (error) 
            throw error;
        else {
            req.flash("patient_add_success_msg", "Patient added successfully");
            res.redirect("/patients/add");
        }
    });
});


// Delete a Doctor (GET)
router.get("/delete", (req, res) => {
    query = "SELECT * FROM pri_phy_patient";
    connection.query( query, function (error, results, fields) {
        if (error) 
            throw error;
        else
            res.render("patients/delete_patients", {res:results});
    });
});

router.get("/delete/:ssn", (req, res) => {
    let { ssn } = req.params;
    query = `DELETE FROM pri_phy_patient WHERE ssn= '${ssn}'`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.send("Error: "+ error);
        else {
            req.flash("patient_delete_success_msg", "Patient deleted successfully");
            res.redirect("/patients/delete");
        }
    });
});


module.exports = router;