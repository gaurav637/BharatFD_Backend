const client = require('../config/redis');
const logger = require('../utils/logger'); 

const getCache = async (key) => {
  try {
    logger.info(`Redis Fetching key: ${key}`);
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Redis Query timed out')), 5000)
    );

    const cacheData = await Promise.race([
      new Promise((resolve, reject) => {
        client.get(key, (err, data) => {
          if (err) return reject(err);
          resolve(data ? JSON.parse(data) : null);
        });
      }),
      timeout
    ]);

    if (cacheData) {
      logger.info(`Redis Cache hit for key: ${key}`);
    } else {
      logger.warn(`Redis Cache miss for key: ${key}`);
    }

    return cacheData;
  } catch (error) {
    logger.error(`Redis Error fetching key "${key}": ${error.message}`);
    return null; // Return null instead of rejecting, to prevent application crash
  }
};


const setCache = (key, data, expiry = 3600) => {
  try {
    logger.info(`Redis Setting key: ${key} with expiry: ${expiry}s`);
    client.setex(key, expiry, JSON.stringify(data), (err) => {
      if (err) {
        logger.error(`Redis Failed to set key: ${key} - ${err.message}`);
      }
    });
  } catch (error) {
    logger.error(`Redis Unexpected error setting key "${key}": ${error.message}`);
  }
};

const deleteCache = (key) => {
  try {
    logger.info(`Redis Deleting key: ${key}`);
    client.del(key, (err) => {
      if (err) {
        logger.error(`Redis Failed to delete key: ${key} - ${err.message}`);
      }
    });
  } catch (error) {
    logger.error(`Redis Unexpected error deleting key "${key}": ${error.message}`);
  }
};

module.exports = { 
    getCache, 
    setCache, 
    deleteCache 
};
