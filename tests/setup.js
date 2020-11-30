jest.setTimeout(60 * 1000);  // 60 seconds

require("../models/User");

const mongoose = require("mongoose");
const keys = require("../config/keys");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { 
    useNewUrlParser: true,
});
