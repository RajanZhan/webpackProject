const fs = require("fs");
const express = require('express');
const app = express();
const path = require("path");
const responseExtends = require("./extends/response");
const template = require('art-template');
global.$tp = template;
global.$config = JSON.parse(fs.readFileSync("./config.json").toString());
global.$common = require("./extends/common");;
var  db = require("./lib/db")();
var redis = require("./lib/redis")();
app.use(express.static('static'));
app.use(express.static('dist'));

// 挂载response扩展方法
app.use((req,res,next)=>{
    for(let key in responseExtends){
        res[key] = responseExtends[key]; 
    }
    next();
})


template.config('base', '');
template.config('extname', '.html');
app.engine('html', template.__express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'dist'));
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
app.use('/',require("./controller/Home.js").middle,require("./controller/Home.js").router);
app.use('/admin',require("./controller/Admin.js").middle,require("./controller/Admin.js").router);

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
}

app.listen($config.port);
console.log(`app is running and listen port ${$config.port}`);