const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/items")
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/items",itemRoutes);

module.exports = app;
