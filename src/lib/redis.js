const redis = require("redis");
var redisInstance = null;
module.exports = ()=>{
    var config = $config.redis;
    if((!config) || (config.use != 1)) return null;
    if((!config) || (!config.host) || (!config.port)) throw "redis 配置信息为空，无法配置";
    if(redisInstance) return redisInstance;
    let client = redis.createClient(config.port,config.host,{auth_pass:config.pass});
    client.on("ready",(res)=>{
        console.log("redis cache init ok ");
    });
    redisInstance = client;
    return redisInstance;
}