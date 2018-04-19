const redis = require("./redis")();
module.exports = ()=> {
    if($config.redis.use != 1) throw "无法启用缓存，请先开启redis功能";
    if(!redis) throw "redis 实例获取失败";
    return {
         get(key){
            return new Promise((resolve,reject)=>{
                try {
                    if(!key)
                    {
                           resolve(null);
                           return;
                    }
                    redis.get(key,(err,value)=>{
                            if(err) {
                                reject({position: "cache.get", err: err});
                                return;
                            }
                            value = JSON.parse(value)
                            resolve(value);
                    })
                }
                catch (e) {
                    reject({position:"cache.get",err:e});
                }
            })

        },
         set(key,value,expire){
            return new Promise((resolve,reject)=>{
                   if((!key) || (!value)){
                       resolve(null);
                       return;
                   }
                   value = JSON.stringify(value);
                   if(expire){
                       redis.setex(key,expire,value,(err,value)=>{
                           if(err)
                           {
                               reject({position:"cache.set",err:err});
                               return;
                           }
                           resolve(value);
                       })
                   }
                   else
                   {
                       redis.set(key,value,(err,value)=>{
                           if(err)
                           {
                               reject({position:"cache.set",err:err});
                               return;
                           }
                           resolve(value);
                       });
                   }

            })
        }
    }
}
