const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const contactRoutes = require("./routes/contact");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("tiny"));
app.use("/contact", contactRoutes);

app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

if (app.get("env") === "development") {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

app.listen(3000, () => console.log(`Server starting on port ${port}`));