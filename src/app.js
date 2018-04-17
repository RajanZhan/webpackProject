const fs = require("fs");
const Person = require("./lib/Person.js");
const express = require('express');
const app = express();
const path = require("path");
var arguments = process.argv.splice(2);
const DEBUG = true; // 是否调试模式

app.use(express.static('static'));
//读取启动的配置文件
if(!DEBUG){
	if(arguments.length <= 0 ) throw "配置文件不能为空";
	const configPath = path.join(__dirname,arguments[0]);
	if(!fs.existsSync(configPath)) throw "配置文件读取失败";
	global.config = JSON.parse(fs.readFileSync(configPath).toString());
}
else
{
	global.config = JSON.parse(fs.readFileSync("./config.json").toString());
}

app.use('/',require("./router/Home.js"));

app.listen(config.port);
console.log(`app is running and listen port ${config.port}`);
global.DEBUG = DEBUG;