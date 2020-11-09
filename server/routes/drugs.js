const express = require("express");
const router = express.Router();
const connection = require("../app.js").connection;
const {ensureAuthenticated} = require("../config/auth");

// List all drugs
router.get("/", (req, res) => {
    query = `SELECT trade_name as drug_name, formula, pharm_co_name FROM make_drug`;
    connection.query( query, function (error, results, fields) {
        if (error) 
            throw error;
        else
            res.send(results);
    });
});

// List All prescipritions by Phrmacy
router.get("/all_drugs_by_pharmacies", (req, res) => {
    query = `SELECT d.trade_name, d.pharm_co_name, d.price, p.name, p.address, p.phone
            FROM pharmacy p
            JOIN sell d ON d.pharm_id = p.pharm_id`;
    connection.query(query, function (error, results, fields) {
    if (error) 
        throw error;
    else
        res.send(results);
    });
});


// List expensive Drugs
router.get("/expensive_drugs", (req, res) => {
    query = `SELECT s.* 
            FROM sell s
            JOIN (SELECT trade_name, max(price) as price
            FROM sell 
            GROUP BY trade_name) temp
            WHERE temp.trade_name = s.trade_name AND temp.price = s.price;`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.send("Error: "+ error);
        else
            res.send(results);
    });
});


// List inexpensive Drugs
router.get("/inexpensive_drugs", (req, res) => {
    query = `SELECT s.* 
            FROM sell s
            JOIN (SELECT trade_name, min(price) as price
            FROM sell 
            GROUP BY trade_name) temp
            WHERE temp.trade_name = s.trade_name AND temp.price = s.price;`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.send("Error: "+ error);
        else
            res.send(results);
    });
});


module.exports = router;