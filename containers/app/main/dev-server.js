// dev-server.js
require('dotenv').config(); // require dotenv
const cli = require('next/dist/cli/next-dev');

console.log("Starting development server on port:", process.env.PORT || 3010);

cli.nextDev(['-p', process.env.PORT || 3010]);
