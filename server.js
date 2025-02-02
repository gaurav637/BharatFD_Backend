const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const router = require("./routes");

const app = express();

// Middleware
app.options('*', cors());
app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json());

// Router 
app.use("/api", router);

// Routes
app.get('/', (req, res) => {
    res.send('Hello, Welcome to BharatFD!');
});

// Only connect to DB and Redis if not testing
if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

module.exports = app;