const fs = require("fs");
const express = require('express');
const app = express();
const path = require("path");
global.$config = JSON.parse(fs.readFileSync("./config.json").toString());
var  db = require("./lib/db")();
var redis = require("./lib/redis")();
var arguments = process.argv.splice(2);
const DEBUG = true; // 是否调试模式

app.use(express.static('static'));
app.use(express.static('dist'));
//读取启动的配置文件
if($config.debug == 1){
    var webpack = require("webpack");
    var webpackConfig = require("./webpack.config.js");
    var compiler = webpack(webpackConfig);
    var WebpackHotMid = require("webpack-hot-middleware");
    var WebpackDevMid = require("webpack-dev-middleware");
    var webpackHotMid = WebpackHotMid(compiler);  //=>require("webpack-hot-middleware")(complier)
    var webpackDevMid = WebpackDevMid(compiler, {
        publicPath: '/',
        stats: {
            colors: true,
            chunks: false
        }
    });
    app.use(webpackDevMid);
    app.use(webpackHotMid);
    console.log("webpac init ...");
}
console.log($config);
app.set('views', path.join(__dirname, 'dist'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use('/',require("./controller/Home.js").middle,require("./controller/Home.js").router);

app.listen($config.port);
console.log(`app is running and listen port ${$config.port}`);
global.DEBUG = DEBUG;