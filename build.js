const path = require('path');
const fs = require('fs')

const SRC_FILE = path.resolve(__dirname, './src/index.html');
const OUTPUT_FILE = path.resolve(__dirname, './build/index.html');

const SRC_FILE_INFO = path.resolve(__dirname, './src/info.html');
const OUTPUT_FILE_INFO = path.resolve(__dirname, './build/info.html');


// Read /src/index.html
const src = fs.readFileSync(SRC_FILE, 'utf8');
// Replace server URL
const output = src.replace(/https:\/\/sauce-jobs-staging.herokuapp.com\/jobs/g, process.env.API_URL);
// Write the output
fs.writeFileSync(OUTPUT_FILE, output, 'utf8');


// Landing
fs.writeFileSync(OUTPUT_FILE_INFO, fs.readFileSync(SRC_FILE_INFO, 'utf8'), 'utf8');
