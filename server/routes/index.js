const express = require("express");
const router = express.Router();
const connection = require("../app.js").connection;
const {ensureAuthenticated} = require("../config/auth");



// Dashboard 
router.get("/dashboard", ensureAuthenticated, (req, res) => {
    query = `SELECT 'Patients' as name, count(*) as count FROM pri_phy_patient
            UNION ALL
            SELECT 'Doctors' as name, count(*) as count FROM doctor
            UNION ALL
            SELECT 'Prescriptions' as name, count(*) as count FROM prescription
            UNION ALL
            SELECT 'Pharmaceutical Companies' as name, count(*) as count FROM pharm_co
            UNION ALL
            SELECT 'Pharmacies' as name, count(*) as count FROM pharmacy
            UNION ALL
            SELECT 'Contracts' as name, count(*) as count FROM contract
            UNION ALL
            SELECT 'Drugs' as name, count(*) as count FROM make_drug
            UNION ALL
            SELECT 'Drugs Sold by Pharmacies' as name, count(*) as count FROM sell`;
    connection.query( query, function (error, results, fields) {
        if (error) 
            res.render("dashboard_1", {name: req.user.name});
        else
            res.render("dashboard", {res:results});
    });
    
});

// Welcome Page
router.get("/", (req, res) => res.render("welcome"));

module.exports = router;
