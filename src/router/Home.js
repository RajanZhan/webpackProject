var express = require('express'),router = express.Router();
const Person = require("../lib/Person");
router.get("/",(req,res)=>{
	
	let person = new Person();
	console.log(person.getAge());
	res.send("hello world 3 " + config.version + DEBUG);
	
})
module.exports = router;