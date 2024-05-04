//environment variables
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const url = process.env.DB_URL;


module.exports.connectUsingMongoose = async function(){
    try{ await mongoose.connect(`${url}/Habit-Tracker`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("MongoDB connected using mongoose");
} catch (err) {
    console.log(err);
}
}