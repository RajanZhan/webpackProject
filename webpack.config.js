var webpcak = require('webpack');
const fs = require("fs");
const path = require("path");

var nodeModules = {};
fs.readdirSync('node_modules')
.filter(function(x) {
	return ['.bin'].indexOf(x) === -1;
})
.forEach(function(mod) {
	nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
    entry: [
        './src/app.js'
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'build.js'
    },
	target: 'node',
    externals: nodeModules,
	context: __dirname,
	node: {
		__filename: false,
		__dirname: false
	},
}