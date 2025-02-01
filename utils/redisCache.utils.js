const client = require('../config/redis');

// Get data from cache
const getCache = (key) => {
  return new Promise((resolve, reject) => {
    console.log(`[Redis] Fetching key: ${key}`);

    // Timeout for Redis operation
    const timeout = setTimeout(() => {
      console.error('[Redis] Query timed out.');
      reject(new Error('Redis query timed out'));
    }, 5000);

    client.get(key, (err, data) => {
      clearTimeout(timeout);
      if (err) {
        console.error('[Redis] Error:', err.message);
        return reject(err);
      }
      console.log(`[Redis] Cache hit for key: ${key}`);
      resolve(data ? JSON.parse(data) : null);
    });
  });
};

// Set data to cache with expiration time
const setCache = (key, data, expiry = 3600) => {
  console.log(`[Redis] Setting key: ${key} with expiry: ${expiry}s`);
  client.setex(key, expiry, JSON.stringify(data), (err) => {
    if (err) {
      console.error(`[Redis] Failed to set key: ${key}`, err.message);
    }
  });
};

// Delete cache entry
const deleteCache = (key) => {
  console.log(`[Redis] Deleting key: ${key}`);
  client.del(key, (err) => {
    if (err) {
      console.error(`[Redis] Failed to delete key: ${key}`, err.message);
    }
  });
};

module.exports = { getCache, setCache, deleteCache };
