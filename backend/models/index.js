const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");

db.clearAllUsers = () => {
    db.mongoose.connection.collections.users.remove({},(err) => {
        done();
    });
}

module.exports = db;