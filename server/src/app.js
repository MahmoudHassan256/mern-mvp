const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));

/*
app.use("api/auth");
app.use("api/items");
*/

module.exports = app;
