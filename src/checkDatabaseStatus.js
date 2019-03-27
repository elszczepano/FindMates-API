import mongoose from 'mongoose';
import chalk from 'chalk';

const {cyan} = chalk.bold;
const {yellow} = chalk.bold.yellow;
const {red} = chalk.bold.red;

function checkDatabaseStatus(url) {
	const db = mongoose.connection;

	db.on('connected', function() {
		console.log(cyan(`Mongoose connection is open to ${url}`));
	});

	mongoose.connection.on('error', function(err) {
		console.log(red(`Mongoose connection has occured ${err} error`));
	});

	mongoose.connection.on('disconnected', function() {
		console.log(yellow('Mongoose connection is disconnected'));
	});
}

export default checkDatabaseStatus;
