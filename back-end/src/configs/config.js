require("dotenv").config()

const config = {
    port: process.env.PORT,
    dbUrl: process.env.MONGO_URI,
    email : process.env.EMAIL_USER,
    password : process.env.EMAIL_PASS,
    app_pass : process.env.APP_PASS
}

module.exports = config;