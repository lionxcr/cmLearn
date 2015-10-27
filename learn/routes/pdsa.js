var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'cmlearn',
  password : 'cml34rn',
  database : 'learn'
});

router.post('/newPDSA', function(req, res, next) {
	console.log(req.body);
});

/* GET home page. */
router.get('/', function(req, res, next) {
   	var hello = getGreetings(req.cookies['learn']['name']);
   	var currency = req.cookies['learn']['currency'];
   	var balance = req.cookies['learn']['balance'];
   	if (currency == 'USD') currency = '$';
   	if (currency == 'GBP') currency = '£';
   	if (currency == 'CAD') currency = 'C$';

   	//GET form Questions
   	var conference 	= [];
	var workshop 	= [];
	var seminar 	= [];
	var course 		= [];
	var pd 			= [];
	var membership 	= [];
	var book 		= [];
	var magazine 	= [];
	var response 	= [];
	connection.query('SELECT * FROM questions',function(err,rows){
  	if(err) throw err;
	  	for (var i = 0; i < rows.length; i++) {
	  		var type = rows[i]['category'];
	  		switch(type) {
			    case 'conference':
			        conference.push(rows[i]);
			        break;
			    case 'workshop':
			        workshop.push(rows[i]);
			        break;
			    case 'seminar':
			        seminar.push(rows[i]);
			        break;
			    case 'course':
			        course.push(rows[i]);
			        break;
			    case 'professional designation':
			        pd.push(rows[i]);
			        membership.push(rows[i]);
			        break;
			    case 'book':
			        book.push(rows[i]);
			        break;
			    case 'magazine':
			        magazine.push(rows[i]);
			        break;

			    default:
			        break;
			};
			if (i == (rows.length-1)) {
				response.push({'conference' : conference});
				response.push({'workshop' : workshop});
				response.push({'course' : course});
				response.push({'pd' : pd});
				response.push({'membership' : membership});
				response.push({'seminar' : seminar});
				response.push({'book' : book});
				response.push({'magazine' : magazine});
    			res.render('pdsa', { title: 'PDSA Request', greeting : hello, balance : balance, currency : currency, questionArray : response });
 				console.log("Cookie :  ", req.cookies['learn']);
			};
		};
	});
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