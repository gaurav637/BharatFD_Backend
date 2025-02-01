const express = require('express');
require('dotenv').config();
const connectDB  = require('./config/db');
const connectRedis = require("./config/redis");
const router = require("./routes");
const app = express();
const PORT = process.env.PORT || 4040;

const runServer = () => {

    //  Database connection
    connectDB();

    // Redis connection
    connectRedis();

    // Middleware
    app.use(express.json());

    // Router 
    app.use("/api", router);

    // Routes
    app.get('/', (req, res) => {
        res.send('Hello, Welcome to BharatFD!');
    });

    // Start server
    app.listen(8080, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = {
    runServer
};