const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
    try {
        const envVariable = {
            MongoDB_URL: process.env.MONGO_URI || "mongodb://localhost:27017/BharatFD", // Default url of database
        }
        await mongoose.connect(envVariable.MongoDB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected Successfully You can intract with database...');
    } catch(error) {
        console.error('MongoDB Connection Failed. - Please try again..', error.message);
    }
}
module.exports = connectDB;