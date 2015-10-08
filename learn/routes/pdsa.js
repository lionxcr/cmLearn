var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   	var hello = getGreetings(req.cookies['learn']['name']);
   	var currency = req.cookies['learn']['currency'];
   	var balance = req.cookies['learn']['balance'];
   	if (currency == 'USD') currency = '$';
   	if (currency == 'GBP') currency = '£';
   	if (currency == 'CAD') currency = 'C$';
    res.render('pdsa', { title: 'PDSA Request', greeting : hello, balance : balance, currency : currency });
 	console.log("Cookie :  ", req.cookies['learn']);
});

function getGreetings(name){
	var greetingsArray = [
		"Pura Vida",
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
		"Mellow greetings"
	];
	var randMVal = Math.floor(Math.random() * greetingsArray.length-1);
	var greet = greetingsArray[randMVal];
	if (greet == '' || greet == null) {
		greet = greetingsArray[0];
	};
	var greeting = greet+', '+name;
	return greeting;
}

module.exports = router;