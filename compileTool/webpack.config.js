var webpcak = require('webpack');
const fs = require("fs");
const path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var nodeModules = {};
fs.readdirSync('node_modules')
.filter(function(x) {
	return ['.bin'].indexOf(x) === -1;
})
.forEach(function(mod) {
	nodeModules[mod] = 'commonjs ' + mod;
});

nodeModules["sequelize"] = "commonjs sequelize";
nodeModules["redis"] = "commonjs redis";
nodeModules["webpack"] = "commonjs webpack";
nodeModules["html-webpack-plugin"] = "commonjs html-webpack-plugin";
nodeModules["webpack-hot-middleware"] = "commonjs webpack-hot-middleware";
nodeModules["webpack-dev-middleware"] = "commonjs webpack-dev-middleware"
var srcConfig = JSON.parse(fs.readFileSync("../config.json").toString());
if(srcConfig.debug == 1){
    throw "无法编译发布版代码，请先将config.json中的debug置为 0";
}

module.exports = {
    entry: [
        '../app.js'
    ],
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'build.js'
    },
	target: 'node',
    externals: nodeModules,
	context: __dirname,
	node: {
		__filename: false,
		__dirname: false
	},
	plugins:[
		new UglifyJSPlugin()
	]
}