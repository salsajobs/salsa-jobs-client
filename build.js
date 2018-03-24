const path = require('path');
const fs = require('fs')
const production = process.env.PRODUCTION;

// error.html
const SRC_FILE_ERROR = path.resolve(__dirname, './src/error.html');
const OUTPUT_FILE_ERROR = path.resolve(__dirname, './build/error.html');
// index.html
const SRC_FILE_INDEX = path.resolve(__dirname, './src/index.html');
const OUTPUT_FILE_INDEX = path.resolve(__dirname, './build/index.html');
// info.html
const SRC_FILE_INFO = path.resolve(__dirname, './src/info.html');
const OUTPUT_FILE_INFO = path.resolve(__dirname, './build/info.html');
// privacy.html
const SRC_FILE_PRIVACY = path.resolve(__dirname, './src/privacy.html');
const OUTPUT_FILE_PRIVACY = path.resolve(__dirname, './build/privacy.html');

// index.html
const src = fs.readFileSync(SRC_FILE_INDEX, 'utf8');
const output = src.replace(/https:\/\/sauce-jobs-staging.herokuapp.com/g, process.env.API_URL);
fs.writeFileSync(OUTPUT_FILE_INDEX, output, 'utf8');

// info.html
fs.writeFileSync(OUTPUT_FILE_INFO, fs.readFileSync(SRC_FILE_INFO, 'utf8'), 'utf8');
// error.html
fs.writeFileSync(OUTPUT_FILE_ERROR, fs.readFileSync(SRC_FILE_ERROR, 'utf8'), 'utf8');
// privacy.html
fs.writeFileSync(OUTPUT_FILE_PRIVACY, fs.readFileSync(SRC_FILE_PRIVACY, 'utf8'), 'utf8');