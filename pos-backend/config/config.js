require("dotenv").config();

//Object freeze to prevent modification of config values
const config = Object.freeze({
    port:process.env.PORT || 3000,
    databaseURI:process.env.MONGODB_URI || 'mongodb://localhost:27017/pos-backend',
    nodeEnv:process.env.NODE_ENV || 'development',
    accessTokenSecret:process.env.JWT_SECRET
});

module.exports = config;