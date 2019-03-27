import fs from 'fs';
import async from 'async';

const exec = require('child_process').exec; // eslint-disable-line


const files = fs.readdirSync('./src/seed/');
const funcs = files.map(function(file) {
	return exec.bind(null, `babel-node ./src/seed/${file}`);
});

function getResults(err, data) {
	if (err) {
		return console.log(err);
	}
	const results = data.map(function(lines) {
		return lines.join('');
	});
	console.log(results);
}

async.parallel(funcs, getResults);
