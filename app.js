const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();


// Connect to the database
const MONGODB_URI = process.env.MONGODB_URI || JSON.parse(fs.readFileSync('mongo-details.json')).uri;
mongoose
    .connect(
        MONGODB_URI,
        { useNewUrlParser: true }
    )
    .then(result => {
        app.listen(8080);
    })
    .catch(err => console.log(err));