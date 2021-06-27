const dbConfig = require('../config/db.js');

const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./users.js")(mongoose);

module.exports = db;