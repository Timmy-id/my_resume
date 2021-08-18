const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const pool = require("../db/index");
require("dotenv").config();

router.post("/", async function (req, res) {
    try {
        if (!req.body.full_name || !req.body.email || !req.body.phone_number || !req.body.message) {
            return res.status(400).json({
                status: "error",
                message: "Missing Credentials"
            });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        })

        const mailOptions = {
            from: req.body.email,
            to: process.env.USER,
            subject: `Message from ${req.body.email}`,
            text: req.body.message
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
                res.json({
                    status: "error",
                    error: err.message
                })
            } else {
                console.log("Email sent: " + info.response)
                res.json({ status: "success" });
            }
        })

        const result = await pool.query(
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
        const data = await pool.query("SELECT * FROM contacts")
        return res.status(200).json(data.rows)
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
    
})

module.exports = router;