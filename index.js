const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB  = require('./config/db');
const router = require("./routes");
const app = express();
app.options('*', cors());
app.use(cors({
    origin: '*',
    credentials : true,
}));
const PORT = process.env.PORT || 4040;

const runServer = () => {

    //  Database connection
    connectDB();


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