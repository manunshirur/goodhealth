const express = require("express");
const router = express.Router();
const connection = require("../app.js").connection;
const {ensureAuthenticated} = require("../config/auth");

// List all the Contracts
router.get("/", (req, res) => {
    query = `SELECT  p.name, c.pharm_co_name, c.supervisor, c.text, start_date, end_date
            FROM goodhealth.contract c
            JOIN pharmacy p ON c.pharm_id = p.pharm_id
            JOIN pharm_co pc ON c.pharm_co_name = pc.name`;
    connection.query( query, function (error, results, fields) {
        if (error) 
            throw error;
        else
            res.render("contracts/all_contracts", {res:results});
    });
});


// Add a Contract
router.post("/add", (req, res) => {
    let {pharm_id, start_date, end_date, text, supervisor, pharm_co_name} = req.body;
    query = `INSERT INTO contract VALUES \
            ('${pharm_id}','${start_date}','${end_date}','${text}','${supervisor}','${pharm_co_name}')`;
    connection.query(query, function (error, results, fields) {
    if (error) 
        throw error;
    else
        res.send(results);
    });
});

// Update a Contract
router.post("/update", (req, res) => {
    let {pharm_id, start_date, end_date, text, supervisor, pharm_co_name} = req.body;
    query = `UPDATE contract SET \
            start_date= '${start_date}',end_date= '${end_date}', text= '${text}',supervisor= '${supervisor}'
            WHERE pharm_id= '${pharm_id}' AND pharm_co_name= '${pharm_co_name}'`;
    connection.query(query, function (error, results, fields) {
    if (error) 
        throw error;
    else
        res.send(results);
    });
});


// Delete a Contract
router.delete("/delete/:pharm_id/:pharm_co_name", (req, res) => {
    let {pharm_id, pharm_co_name} = req.params;
    query = `DELETE FROM contract WHERE pharm_id = '${pharm_id}' AND pharm_co_name= '${pharm_co_name}'`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.send("Error: "+ error);
        else
            res.send("Number of Rows Deleted: "+ results.affectedRows);
    });
});

module.exports = router;