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
    var domain = req.body.domainName;
    var fullNameStr = req.body.fullName;
    var tierStr = 0;
    var currencyStr = '';
    var balanceStr = 0;
    var titleStr = req.body.jobTitle;
    var locationStr = req.body.location;
    var departmentStr = req.body.department;
    var firstName = req.body.firstName;
    var emailStr = req.body.email;
    var manager = req.body.manager;
    var managerEmail = req.body.managerEmail;
    var managerDomain = req.body.managerDomain;
    connection.query('SELECT * from tiers where id = '+titleStr+'', function(err, rows, fields) {
	  if (!err){
	  	if (rows.length == 0) {
	  		console.log('No User Found');
	  	}else{
	  		titleStr = rows[0]['title'];
	  		tierStr = rows[0]['tier'];
	  		balanceStr = tierStr * 500;
	  		if (locationStr == 'Calgary' || locationStr == 'Toronto') {
	  			currencyStr = 'CAD';
	  		};
	  		if (locationStr == 'Chicago' || locationStr == 'THI' || locationStr == 'LA' || locationStr == 'Nashville' || locationStr == 'New York' || locationStr == 'Hong Kong' || locationStr == 'Singapore') {
	  			currencyStr = 'USD';
	  		};
	  		if (locationStr == 'London') {
	  			currencyStr = 'GBP';
	  		};
	  		var post  = {domainName : domain, fullName : fullNameStr, balance : balanceStr, title : titleStr, tier : tierStr, currency : currencyStr, email : emailStr, department : departmentStr, manager : manager, manager_email : managerEmail, managerDomainName : managerDomain, location : locationStr};
			var query = connection.query('INSERT INTO people SET ?', post, function(err, result) {
			  // Neat!
			  if (!err) {
			  	console.log('added user');
			  	res.cookie('learn' , {'domainName' : domain, 'name' : firstName, 'balance' : balanceStr, currency : currencyStr}, {expire : new Date() + 9999});
			  	res.redirect('/home');
			  }else{
			  	console.log('Error while performing Query.'+err);
			  };
			});
			console.log(query.sql);
	  	};
	    
	  }else{
	  	console.log('Error while performing Query.'+err);
	  };
	});
});

module.exports = router;