const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
const cors = require("cors");
const swaggerDocs = require("./config/swagger");
const app = express();
const PORT = process.env.PORT || 4040;
//  Database connection
connectDB();
// Middleware
app.use(cors());
app.use(express.json());
// Router
app.use("/api", router);
// Routes
app.get("/", (req, res) => {
  res.send("Hello, Welcome to BharatFD!");
});
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
