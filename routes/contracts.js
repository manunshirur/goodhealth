const express = require("express");
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'password',
    database : 'goodhealth'
  });

// List all the Patients
router.get("/", (req, res) => {
    connection.query('SELECT * FROM doctor', function (error, results, fields) {
        if (error) 
            throw error;
        else
            res.send(results);
    });
});

// List all the Patients
router.get("/:name", (req, res) => {
    connection.query('SELECT * FROM doctor where yearsOfExperience=?', [req.params.name], function (error, results, fields) {
    if (error) 
        throw error;
    else
        res.send(results);
    });
});
module.exports = router;