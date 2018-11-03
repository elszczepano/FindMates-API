import mongoose from "mongoose";
import chalk from "chalk";

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;

function checkDatabaseStatus(url) {
    const db = mongoose.connection;

    db.on('connected', function(){
        console.log(connected(`Mongoose connection is open to ${url}`));
    });

    mongoose.connection.on('error', function(err){
        console.log(error(`Mongoose connection has occured ${err} error`));
    });

    mongoose.connection.on('disconnected', function(){
        console.log(disconnected("Mongoose connection is disconnected"));
    });
}

export default checkDatabaseStatus;
