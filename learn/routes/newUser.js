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

router.post('/', function(req, res, next) {
    
    // res.render('home', { title: 'Lean Home'});
    var data = JSON.parse(req.cookies['learn']);
    var domain = data['sAMAccountName'];
    var fullNameStr = data['cn'];
    var tierStr = 0;
    var currencyStr = '';
    var balanceStr = 0;
    var titleStr = req.body.jobTitle;
    var locationStr = req.body.location;
    var departmentStr = req.body.department;
    var emailStr = data['userPrincipalName']
    connection.query('SELECT * from tiers where id = '+titleStr+'', function(err, rows, fields) {
	  if (!err){
	  	if (rows.length == 0) {
	  		console.log('No User Found');
	  	}else{
	  		titleStr = rows[0]['title'];
	  		tierStr = rows[0]['tier'];
	  		balanceStr = tierStr * 500;
	  		if (locationStr == '0' || locationStr == '9') {
	  			currencyStr = 'CAD';
	  		};
	  		if (locationStr == '1' || locationStr == '2' || locationStr == '4' || locationStr == '3' || locationStr == '6' || locationStr == '7' || locationStr == '8') {
	  			currencyStr = 'USD';
	  		};
	  		if (locationStr == '5') {
	  			currencyStr = 'GBP';
	  		};
	  		switch(locationStr) {
			    case '0':
			        locationStr = 'CALGARY';
			        break;
			    case '1':
			        locationStr = 'CHICAGO';
			        break;
			    case '2':
			        locationStr = 'COSTA RICA';
			        break;
			    case '3':
			        locationStr = 'HONG KONG';
			        break;
			    case '4':
			        locationStr = 'LOS ANGELES';
			        break;
			    case '5':
			        locationStr = 'LONDON';
			        break;
			    case '6':
			        locationStr = 'NASHVILLE';
			        break;
			    case '7':
			        locationStr = 'NEW YORK';
			        break;
			    case '8':
			        locationStr = 'SINGAPORE';
			        break;
			    case '9':
			        locationStr = 'TORONTO';
			        break;
			    default:
			        break;
			}
	  		var post  = {domainName : domain, fullName : fullNameStr, balance : balanceStr, title : titleStr, tier : tierStr, currency : currencyStr, email : emailStr, department : departmentStr, location : locationStr};
			var query = connection.query('INSERT INTO people SET ?', post, function(err, result) {
			  // Neat!
			  console.log('added user');
			  res.cookie('learn' , {'domainName' : domain, 'name' : data['givenName'], 'balance' : balanceStr, currency : currencyStr}, {expire : new Date() + 9999});
			  res.redirect('/home');
			});
			console.log(query.sql);
	  	};
	    
	  }else{
	  	console.log('Error while performing Query.'+err);
	  };
	});
});

module.exports = router;