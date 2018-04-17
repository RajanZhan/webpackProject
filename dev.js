const fs = require("fs");
const watch = require("node-watch");
const devConfig = require("./dev.config");
const path = require("path");
const  fileDir = require("./devLib/fileDir");// 文件和文件夹相关的 操作工具对象

// 监听配置文件变动
watch(`${devConfig.devPath}/config.json`, { recursive: true },  async function  (evt, name) {
    let body = fs.readFileSync(`${devConfig.devPath}/config.json`)
    fs.writeFileSync(path.join(__dirname,"./build/config.json"),body,{flag:'w',encoding:'utf-8'});
});

// 监听文件夹的变动
const watchDir = [
    "static",
    "node_modules"
]
for(let dir of watchDir)
{
    watch(`${devConfig.devPath}/${dir}`,{ recursive: true },  async function  (evt, name) {
        console.log(evt,name);
        var desPath = path.join(__dirname,`build/${dir}`,name.split(dir)[1]);
        // 修改 增加
        if(evt == "update"){
            var state = fs.statSync(name);
            if(state.isFile())
            {
                let body = fs.readFileSync(name);

                //console.log("des path is ",desPath)
                console.log("递归创建目录",desPath,desPath.slice(desPath.lastIndexOf("\\"),-1));
                //
                fs.writeFileSync(desPath, body,{flag:'w',encoding:'utf-8'});
            }
            if(state.isDirectory())
            {
                if(!fs.existsSync(desPath)){
                    //fs.mkdirSync(desPath)
                    fileDir.mkDirs(desPath);//递归创建目录
                }
            }
        }
        else if(evt == "remove")
        {
            if(fs.existsSync(desPath)){
                var state = fs.statSync(desPath);
                if(state.isFile()) {
                    fs.unlinkSync(desPath);
                }

                if(state.isDirectory())
                {
                    fileDir.delDirs(desPath)
                }
            }
        }
    })
}

