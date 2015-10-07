var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   	var hello = getGreetings(req.cookies['learn']['name']);
    res.render('pdsa', { title: 'PDSA Request', greeting : hello });
 	console.log("Cookie :  ", req.cookies['learn']);
});

function getGreetings(name){
	var greetingsArray = [
		"Ahoy",
		"Aloha",
		"Bonjour",
		"Oi",
		"G'day",
		"Greetings",
		"Hello",
		"Hello there",
		"Hey",
		"Hi",
		"Hi there",
		"Howdy",
		"Salutations",
		"Welcome",
		"What's up",
		"Yo",
		"Sup",
		"How art thou",
		"Good morrow",
		"Namaste",
		"Shalom",
		"Top o' the mornin'",
		"Word",
		"Word up",
		"Mellow greetings",
		"C&oacute;mo est&aacute;s"
	];
	var randMVal = Math.floor(Math.random() * greetingsArray.length)
	randMVal = randMVal -1;
	var greet = greetingsArray[randMVal];
	var greeting = greet+', '+name;
	return greeting;
}

module.exports = router;