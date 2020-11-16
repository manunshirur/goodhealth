const express = require("express");
const router = express.Router();
const connection = require("../app.js").connection;
const {ensureAuthenticated} = require("../config/auth");

// Add a Prescription (GET)
router.get("/add", ensureAuthenticated, (req, res) => {
    let patientInfo, doctorInfo, drugInfo;
    patientInfoQuery = `SELECT ssn, name FROM pri_phy_patient`;
    doctorInfoQuery = `SELECT ssn, name FROM doctor`;
    drugInfoQuery = `SELECT trade_name, pharm_co_name FROM make_drug`;

    connection.query(patientInfoQuery, function (error, results, fields) {
        if (error) 
            res.render("error"); 
        else
            patientInfo = results;
    });

    connection.query(doctorInfoQuery, function (error, results, fields) {
        if (error) 
            res.render("error"); 
        else
            doctorInfo = results;
    });

    connection.query(drugInfoQuery, function (error, results, fields) {
        if (error) 
            res.render("error"); 
        else {
            drugInfo = results;
            res.render("prescriptions/add_prescription", {
                patientInfo: patientInfo,
                doctorInfo: doctorInfo,
                drugInfo: drugInfo
            });
        }
    });
});

// Add a Prescription
router.post("/add", ensureAuthenticated, (req, res) => {
    let {ssn, phy_ssn, pre_date, quantity, drug_pharm_co_name, 
        drop_off_time, pick_up_time} = req.body;

    drug_pharm_co_name_array = drug_pharm_co_name.split("_");
    trade_name = drug_pharm_co_name_array[0];
    pharm_co_name = drug_pharm_co_name_array[1];

    query = `INSERT INTO prescription(ssn, phy_ssn, pre_date, quantity, trade_name,\
            pharm_co_name, status, drop_off_time, pick_up_time) VALUES\
            ('${ssn}','${phy_ssn}','${pre_date}','${quantity}','${trade_name}','${pharm_co_name}','PENDING',\
            '${drop_off_time}','${pick_up_time}')`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.render("error"); 
        else {
            req.flash("presciption_add_success_msg", "Prescription Added Successfully!!!");
            res.redirect("/prescriptions/add");
        }
    });
});


// Delete a Prescription (GET)
router.get("/delete", ensureAuthenticated, (req, res) => {
    query = `SELECT pre_id, pt.name as patient, d.name as doctor, pre_date, quantity, trade_name, pharm_co_name, status FROM prescription ps
    JOIN pri_phy_patient pt on pt.ssn = ps.ssn
    JOIN doctor d on d.ssn = ps.phy_ssn`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.render("error"); 
        else
            res.render("prescriptions/delete_prescription", {res: results});
    });
});


// Delete a Prescription (DELETE)
router.get("/delete/:pre_id", ensureAuthenticated, (req, res) => {
    let pre_id = req.params.pre_id;
    query = `DELETE FROM prescription WHERE pre_id = ${pre_id}`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.render("error"); 
        else {
            req.flash("presciption_delete_success_msg", "Prescription Deleted Successfully!!!");
            res.redirect("/prescriptions/delete");
        }
    });
});

// List Prescriptions based on status and prescription date
router.get("/:status/:prescription_date?", ensureAuthenticated, (req, res) => {
    let status = req.params.status;
    let prescription_date = req.params.prescription_date;
    query = `SELECT pt.name as patient, d.name as doctor, pre_date, quantity, trade_name, pharm_co_name, status FROM prescription ps
            JOIN pri_phy_patient pt on pt.ssn = ps.ssn
            JOIN doctor d on d.ssn = ps.phy_ssn WHERE LOWER(status)= LOWER('${status}')`;
    if (prescription_date){
        query = `SELECT pt.name as patient, d.name as doctor, pre_date, quantity, trade_name, pharm_co_name, status FROM prescription ps
                JOIN pri_phy_patient pt on pt.ssn = ps.ssn
                JOIN doctor d on d.ssn = ps.phy_ssn WHERE LOWER(status)= LOWER('${status}') AND pre_date = '${prescription_date}'`;
    } 
    connection.query( query, function (error, results, fields) {
        if (error) 
            res.render("error"); 
        else
            res.render("prescriptions/statuswise",{res:results, status:status});
    });
});

module.exports = router;