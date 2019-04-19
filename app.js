const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

// Configure CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Configure GraphQL
app.use(
    '/graphql',
    graphqlHttp({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true
    })
);

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