const express = require('express');
const app = express();
const nodemailer = require("nodemailer");
require("dotenv").config();


const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.post('/', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.USER,
        to: req.body.email,
        subject: `Message from ${req.body.email}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.send('error')
        } else {
            // console.log("Email sent: " + info.response)
            res.send('success');
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})