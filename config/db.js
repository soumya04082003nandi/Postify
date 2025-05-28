const mongoose = require("mongoose");
const userModel = require("../models/users")
const dotenv = require("dotenv");


//load env files
dotenv.config();


const conectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("database connected");

    } catch (error) {
        console.log(error);
        process.exit(1);


    }

}

module.exports = {
    conectDB,
}