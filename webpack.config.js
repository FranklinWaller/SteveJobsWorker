const path = require('path');
const packageConfig = require('./package.json');

module.exports = {
    output: {
        path: path.resolve(__dirname, './build'),
        filename: packageConfig.main,
        publicPath: '/build/',
        libraryTarget: 'umd',
    },
};
