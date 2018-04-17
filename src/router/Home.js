var express = require('express'),router = express.Router();
var db = require("../lib/db")();

function middle(req,res,next){
    console.log("home 拦截v11212");
    next();
}

router.get("/",async (req,res)=>{

    let result = await db.models.pet.findAll();
	res.send(result);
})

router.get("/add",async (req,res)=>{

	let result = await db.models.pet.create({
		id:`id${new Date()}`,
		name:`name ${new Date()}`
	})
    res.send("add info  " + result);
})

module.exports = {
	router,
	middle
};