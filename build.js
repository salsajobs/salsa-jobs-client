const path = require('path');
const fs = require('fs')
const production = process.env.PRODUCTION;

// index.html
const SRC_FILE = path.resolve(__dirname, './src/index.html');
const OUTPUT_FILE = path.resolve(__dirname, './build/index.html');
// info.html
const SRC_FILE_INFO = path.resolve(__dirname, './src/info.html');
const OUTPUT_FILE_INFO = path.resolve(__dirname, './build/info.html');

// index.html
const src = fs.readFileSync(SRC_FILE, 'utf8');
const output = src.replace(/https:\/\/sauce-jobs-staging.herokuapp.com/g, process.env.API_URL);
fs.writeFileSync(OUTPUT_FILE, output, 'utf8');
// info.html
fs.writeFileSync(OUTPUT_FILE_INFO, fs.readFileSync(SRC_FILE_INFO, 'utf8'), 'utf8');
