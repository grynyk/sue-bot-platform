const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '../../.env'), // Load from monorepo root
      systemvars: true, // Allows using system environment variables
    }),
  ],
};
