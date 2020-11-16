const express = require("express");
const router = express.Router();
const connection = require("../app.js").connection;
const {ensureAuthenticated} = require("../config/auth");

// List all the Contracts
router.get("/", ensureAuthenticated, (req, res) => {
    query = `SELECT  p.name, c.pharm_co_name, c.supervisor, c.text, start_date, end_date
            FROM goodhealth.contract c
            JOIN pharmacy p ON c.pharm_id = p.pharm_id
            JOIN pharm_co pc ON c.pharm_co_name = pc.name`;
    connection.query( query, function (error, results, fields) {
        if (error) 
            res.render("error");
        else
            res.render("contracts/all_contracts", {res:results});
    });
});


// Add a Contract
router.get("/add", ensureAuthenticated, (req, res) => {
    query = `SELECT pharm_id, name FROM pharmacy`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.render("error");
        else {
            getPhramaCoNameQuery = `SELECT name FROM pharm_co`;
            connection.query(getPhramaCoNameQuery, function (error, result, fields) {
                if (error) 
                    res.render("error");
                else {
                    res.render("contracts/add_contract", {pharmacyNames: results, pharmCoNames: result});
                }
            });
        }
    });
});

// Add a Contract
router.post("/add", ensureAuthenticated, (req, res) => {
    let {pharm_id, start_date, end_date, text, supervisor, pharm_co_name} = req.body;
    query = `INSERT INTO contract VALUES \
            ('${pharm_id}','${start_date}','${end_date}','${text}','${supervisor}','${pharm_co_name}')`;
    connection.query(query, function (error, results, fields) {
        if (error) 
        res.render("error");
        else {
            req.flash("contract_add_success_msg", "Contract Added successfully!!!");
            res.redirect("/contracts/add");
        }
    });
});


// Update a Contract (PUT)

router.get("/update", ensureAuthenticated,  (req, res) => {
    query = `SELECT p.pharm_id, p.name, c.pharm_co_name, 
            c.supervisor, c.text, start_date, end_date
            FROM goodhealth.contract c
            JOIN pharmacy p ON c.pharm_id = p.pharm_id
            JOIN pharm_co pc ON c.pharm_co_name = pc.name`;
    connection.query( query, function (error, results, fields) {
        if (error) 
            res.render("error");
        else
            res.render("contracts/update_contracts", {res:results});
    });
});

// Update a Contract (PUT)

router.post("/update", ensureAuthenticated, (req, res) => {
    let {pharm_id, start_date, end_date, text, supervisor, pharm_co_name} = req.body;
    query = `UPDATE contract SET \
            start_date= '${start_date}',end_date= '${end_date}', text= '${text}',supervisor= '${supervisor}'
            WHERE pharm_id= '${pharm_id}' AND pharm_co_name= '${pharm_co_name}'`;

    connection.query(query, function (error, results, fields) {
        if (error) 
            res.render("error");
        else {
            req.flash("contract_update_success_msg", "Contract Updated Successfully!!!");
            res.redirect("/contracts/update");
        }
    });
});

// Delete a Contract (GET)
router.get("/delete", ensureAuthenticated, (req, res) => {
    query =`SELECT p.pharm_id, p.name, c.pharm_co_name, 
    c.supervisor, c.text, start_date, end_date
    FROM goodhealth.contract c
    JOIN pharmacy p ON c.pharm_id = p.pharm_id
    JOIN pharm_co pc ON c.pharm_co_name = pc.name`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.render("error");
        else
            res.render("contracts/delete_contract", {res:results});
    });
});

// Delete a Contract
router.get("/delete/:pharm_id/:pharm_co_name", ensureAuthenticated, (req, res) => {
    let {pharm_id, pharm_co_name} = req.params;
    query = `DELETE FROM contract WHERE pharm_id = '${pharm_id}' AND pharm_co_name= '${pharm_co_name}'`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.render("error");
        else {
            req.flash("contract_delete_success_msg", "Contract Deleted Successfully!!!");
            res.redirect("/contracts/delete");
        }
    });
});

module.exports = router;