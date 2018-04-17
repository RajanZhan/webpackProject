const Sequelize = require("sequelize");
var instance = null;
const fs = require("fs");
const path = require("path");
module.exports = function (dbconfig) {
    try {
        if(instance)  return instance;
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
        let modelList = fs.readdirSync(path.join(__dirname,"dataModel"));
        for(let m of modelList){
            let model = require(`../dataModel/${m}`)
            instance.define(model.name,model.body);
        }
        instance.sync({force:false});
        return instance
    }
    catch (e) {
        throw "初始化数据库失败" + e;
    }
}