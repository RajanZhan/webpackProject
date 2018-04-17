var fs = require('fs');
var path = require('path');

/** 
  * 文件遍历方法 
  * @param filePath 需要遍历的文件路径 
  */
function  dirList(filePath,options){

    //{dirFunc:dirFunc,fileFucn:fileFunc}
    //根据文件路径读取文件，返回一个fs回文件列表  
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }
        else{
            //遍历读取到的文件列表  
            files.forEach(function(filename){
                //获取当前文件的绝对路径  
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象  
                fs.stat(filedir,async function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件  
                        var isDir = stats.isDirectory();//是文件夹  
                        if(isFile){
                            if(options.fileFunc) {
                                await options.fileFunc(filedir);
                            }
                            console.log(filedir);
                        }
                        if(isDir){
                            if(options.dirFunc) {
                                await options.dirFunc(filedir);
                            }
                            dirList(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件  
                        }
                    }
                })
            });
        }
    });
}


// 递归删除目录
function delDirs(p){
    var arr=fs.readdirSync(p);
    for(var i in arr){
        //读取文件信息，以便于判断是否是一个文件或目录
        var stats=fs.statSync(p+'/'+arr[i]);
        if(stats.isFile()){
            //判断为真，是文件则执行删除文件
            fs.unlinkSync(p+'/'+arr[i]);
        }else{
            //判断为假就是文件夹，就调用自己，递归的入口
            delDirs(p+'/'+arr[i]);
        }
    }
    //删除空目录
    fs.rmdirSync(p);
}

// 递归创建目录
function mkDirs(dirname) {
    //console.log(dirname);  
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkDirs(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}


module.exports = {
    dirList:dirList,
    delDirs:delDirs,
    mkDirs:mkDirs
}