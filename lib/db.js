const Sequelize = require("sequelize");
var instance = null;
const fs = require("fs");
const path = require("path");
var dataModelList = [];
dataModelList.push(require("../dataModel/pet.model.js"));// 载入数据模型 便于编译打包




module.exports = function () {
    try {
        if(instance)  return instance;
        var dbconfig = $config.db;
        if((!dbconfig) || (!dbconfig.db) || (!dbconfig.uname) ) throw "数据库尚未初始化";
        instance = new Sequelize(dbconfig.db, dbconfig.uname, dbconfig.pwd,{
            timestamps:false,
            host: dbconfig.host,
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 30000
            }
        })
        var modelList = "";
        /*if($config.debug == 1){
            modelList = fs.readdirSync(path.join(__dirname,"../","dataModel"));
        }
        else
        {
            modelList = fs.readdirSync(path.join(__dirname,"dataModel"));
        }
        for(let m of modelList){
            let model = require(`../dataModel/${m}`)
            instance.define(model.name,model.body);
        }*/
		for(let model of dataModelList){
            instance.define(model.name,model.body);
        }
        instance.sync({force:false});
        return instance
    }
    catch (e) {
        throw "初始化数据库失败" + e;
    }
}