const { createClient } = require('redis');
require('dotenv').config();

// Create a new Redis client
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
        if (!client.isOpen) {
            await client.connect();
            if (process.env.NODE_ENV !== 'test') {
                console.log('Redis connected successfully');
            }
        }
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.error('Redis Client Error:', error);
        }
    }
    return client;
};

// Only connect if not in test environment
if (process.env.NODE_ENV !== 'test') {
    connectRedis();
}

module.exports = {
    client,
    connectRedis,
    quit: async () => {
        if (client.isOpen) {
            await client.quit();
        }
    }
};