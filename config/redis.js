const { createClient } = require('redis');
require('dotenv').config();

// Create a new Redis User
const client = createClient({
    username: process.env.REDIS_USERNAME || 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

// Connect Redis
const connectRedis = async () => {
    try {
        await client.connect();
        console.log('Redis connected successfully');
    } catch (error) {
        console.error('Redis Client Error:', error);
    }
};

connectRedis();

module.exports = client;