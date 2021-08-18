const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async function (req, res) {
    try {
        if (!req.body.full_name || !req.body.email || !req.body.phone_number || !req.body.message) {
            return res.status(400).json({
                status: "error",
                message: "Missing Credentials"
            });
        }
        const result = await db.query(
            `INSERT INTO contacts (full_name, email, phone_number, message) 
                VALUES ($1, $2, $3, $4) RETURNING *`,
                [req.body.full_name, req.body.email, req.body.phone_number, req.body.message]
        );
        return res.json(result.rows[0]);     
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
});

router.get("/", async function (req, res) {
    try {
        const data = await db.query("SELECT * FROM contacts")
        return res.status(200).json(data.rows)
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
    
})

module.exports = router;