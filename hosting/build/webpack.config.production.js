var webpackConfig = require('./webpack.config.js');

// Better full source maps for production (they are slow to build
// so only use them in production)
webpackConfig.devtool = 'source-maps';

module.exports = webpackConfig;

