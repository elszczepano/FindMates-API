import fs from 'fs';
import async from 'async';
const exec = require('child_process').exec

const scriptsFolder = './src/seed/';

const files = fs.readdirSync(scriptsFolder);
const funcs = files.map(function(file) {
    return exec.bind(null, `babel-node ${scriptsFolder}${file}`);
});

function getResults(err, data) {
    if (err) {
        return console.log(err);
    }
    const results = data.map(function(lines){
        return lines.join('');
    });
    console.log(results);
}

async.parallel(funcs, getResults);
