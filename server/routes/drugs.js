const express = require("express");
const router = express.Router();
const connection = require("../app.js").connection;
const {ensureAuthenticated} = require("../config/auth");

// List all drugs
router.get("/", ensureAuthenticated, (req, res) => {
    query = `SELECT trade_name as drug_name, formula, pharm_co_name FROM make_drug`;
    connection.query( query, function (error, results, fields) {
        if (error) 
            res.render("error");
        else
            res.render("drugs/all_drugs", {res:results});
    });
});

// List All prescipritions by Phrmacy
router.get("/all_drugs_by_pharmacies", ensureAuthenticated, (req, res) => {
    query = `SELECT d.trade_name, d.pharm_co_name, d.price, p.name, p.address, p.phone
            FROM pharmacy p
            JOIN sell d ON d.pharm_id = p.pharm_id`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.render("error");
        else
            res.render("drugs/all_pharmacies_drugs", {res:results});
    });
});


// List expensive Drugs
router.get("/expensive_drugs", ensureAuthenticated, (req, res) => {
    query = `SELECT p.name, s.trade_name, s.pharm_co_name, s.price
            FROM sell s
            JOIN (SELECT trade_name, max(price) as price
            FROM sell 
            GROUP BY trade_name) temp
            JOIN pharmacy p ON p.pharm_id = s.pharm_id
            WHERE temp.trade_name = s.trade_name AND temp.price = s.price`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.render("error");
        else
            res.render("drugs/expensive_drugs", {res:results, title:'Most Expensive Drugs List'});
    });
});


// List inexpensive Drugs
router.get("/inexpensive_drugs", ensureAuthenticated, (req, res) => {
    query = `SELECT p.name, s.trade_name, s.pharm_co_name, s.price
            FROM sell s
            JOIN (SELECT trade_name, min(price) as price
            FROM sell 
            GROUP BY trade_name) temp
            JOIN pharmacy p ON p.pharm_id = s.pharm_id
            WHERE temp.trade_name = s.trade_name AND temp.price = s.price`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.render("error");
        else
            res.render("drugs/expensive_drugs", {res:results, title:'Least Expensive Drugs List'});
    });
});

// List Alternate Pharmacies
router.get("/alternate_pharmacies", ensureAuthenticated, (req, res) => {
    query = `SELECT p1.name, s1.trade_name as drug_name, p2.name alternative_pharmacy, p2.address, p2.phone
            FROM sell s1, sell s2, pharmacy p1, pharmacy p2
            where s1.pharm_id < s2.pharm_id
            AND s1.pharm_id = p1.pharm_id
            AND s2.pharm_id = p2.pharm_id
            AND s1.trade_name = s2.trade_name
            ORDER BY p1.name;`;
    connection.query(query, function (error, results, fields) {
        if (error) 
            res.render("error");
        else
            res.render("drugs/alternate_pharmacies", {res:results});
    });
});


module.exports = router;