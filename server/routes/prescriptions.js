const express = require("express");
const router = express.Router();
const connection = require("../app.js").connection;
const {ensureAuthenticated} = require("../config/auth");

// List Prescriptions based on status and prescription date
router.get("/:status/:prescription_date?", (req, res) => {
    let status = req.params.status;
    let prescription_date = req.params.prescription_date;
    query = `SELECT * FROM prescription WHERE LOWER(status)= LOWER('${status}')`;
    if (prescription_date){
        console.log(query);
        query = `SELECT * FROM prescription WHERE LOWER(status)= LOWER('${status}') AND pre_date = '${prescription_date}'`;
    } 
    connection.query( query, function (error, results, fields) {
        if (error) 
            throw error;
        else
            res.send(results);
    });
});

// Add a Prescription
router.post("/add", (req, res) => {
    let {ssn, phy_ssn, pre_date, quantity, trade_name, 
        pharm_co_name, status, drop_off_time, pick_up_time} = req.body;
    query = `INSERT INTO prescription(ssn, phy_ssn, pre_date, quantity, trade_name,\
        pharm_co_name, status, drop_off_time, pick_up_time) VALUES\
        ('${ssn}','${phy_ssn}','${pre_date}','${quantity}','${trade_name}','${pharm_co_name}','${status}',\
        '${drop_off_time}','${pick_up_time}')`;
    connection.query(query, function (error, results, fields) {
    if (error) 
        throw error;
    else
        res.send(results);
    });
});


// Delete a Prescription
router.delete("/delete/:pre_id", (req, res) => {
    let pre_id = req.params.pre_id;
    query = `DELETE FROM prescription WHERE pre_id = ${pre_id}`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.send("Error: "+ error);
        else
            res.send("Number of Rows Deleted: "+ results.affectedRows);
    });
});



module.exports = router;