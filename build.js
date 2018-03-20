const path = require('path');
const fs = require('fs')

const SRC_FILE = path.resolve(__dirname, './src/index.html');
const OUTPUT_FILE = path.resolve(__dirname, './build/index.html');


// Read /src/index.html
const src = fs.readFileSync(SRC_FILE, 'utf8');
// Replace server URL
const output = src.replace(/https:\/\/sauce-jobs-staging.herokuapp.com\/jobs/g, process.env.API_URL);
// Write the output
fs.writeFileSync(OUTPUT_FILE, output, 'utf8');