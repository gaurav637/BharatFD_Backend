const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4040;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
