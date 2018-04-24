var express = require('express'),router = express.Router();
var db = require("../lib/db")();
var cache = require("../lib/cache")();

function middle(req,res,next){
    //console.log("home 拦截1111");
    next();
}

router.get("/",async(req,res)=>{
    res.render("admin.html");
});




module.exports = {
	router,
	middle
};