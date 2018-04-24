var express = require('express'),router = express.Router();
var db = require("../lib/db")();
var cache = require("../lib/cache")();

function middle(req,res,next){
    console.log("home 拦截1111");
    next();
}

router.get("/",async (req,res)=>{
	
	console.log($common.getDate());
	res.render("home.index.html",{name:"rajan"});
})

router.get("/test",async (req,res)=>{

    //let result = await db.models.pet.findAll();
    //let result = await cache.get("name");
    console.log("test");
    //res.render("index.html");
    res.send("test11");
})

router.get("/add",async (req,res)=>{

	// let result = await db.models.pet.create({
	// 	id:`id${new Date()}`,
	// 	name:`name ${new Date()}`
	// })
	//let setCache = await cache.set("name",{name:`name ${new Date()}`},30)
	//let setCache = await cache.set("name",`name ${new Date()}`,30)
    res.send("add info  " );
})

module.exports = {
	router,
	middle
};