var express = require('express');
var router = express.Router();

var ActiveDirectory = require('activedirectory');
var config = { url: 'ldap://leopard.cmass.criticalmass.com',
               baseDN: 'dc=cmass,dc=criticalmass,dc=com'}

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'cmlearn',
  password : 'cml34rn',
  database : 'learn'
});

var username = '';

var password = '';

/* Login Post Request. */
router.post('/', function(req, res, next) {
  // res.send('respond with a resource');
  sess = req.session;
  password = req.body.password;
  username = req.body.username;
  var ad = new ActiveDirectory(config);

  ad.authenticate(username, password, function(err, auth) {
  if (err) {
    console.log('ERROR: '+JSON.stringify(err));
    return;
  }

  if (auth) {
    console.log('Authenticated!');
	    var config_v2 = { 
	    	url: 'ldap://leopard.cmass.criticalmass.com',
	        baseDN: 'ou=CriticalMass,dc=cmass,dc=criticalmass,dc=com',
	      	username: 'jiveldap',
	        password: 'j!ve2013'
	    }
	    var query = 'mail='+username+'';
	    var good = false;
	    var ad_v2 = new ActiveDirectory(config_v2);
	    ad_v2.findUsers(query, function(err, users) {
		  if (err) {
		    console.log('ERROR: ' +JSON.stringify(err));
		    return;
		  }

		  if (!users){
		  	console.log('User not found.');
		  }else{
			  	var ind = username.indexOf('@');
				var domainName = username.slice(0,ind);
				connection.query('SELECT * from people where domainName = "'+domainName+'"', function(err, rows, fields) {
				  if (!err){
				  	if (rows.length == 0) {
				  		console.log('No User Found');
				  	}else{
				  		res.cookie('learn' , {'domainName' : users[0]['sAMAccountName'], 'name' : users[0]['givenName'], 'balance' : rows[0]['balance'], currency : rows[0]['currency']}, {expire : new Date() + 9999});
				  		good = true;
				  	};
				    if (good){
					res.redirect('/home')
				}else{
					var department =[
						'technology',
						'design',
						'hr'
						];
					var locations = [
						'CALGARY',
						'CHICAGO',
						'COSTA RICA',
						'HONG KONG',
						'LOS ANGELES',
						'LONDON',
						'NASHVILLE',
						'NEW YORK',
						'SINGAPORE',
						'TORONTO'
					];
					connection.query('SELECT * from tiers', function(err, rows, fields) {
					  if (!err){
					  	res.cookie('learn' , JSON.stringify(users[0]), {expire : new Date() + 1111});
						res.render('newUser', { title: 'CM Learn Welcome', 'name' : users[0]['givenName'], 'domainName' : users[0]['sAMAccountName'], 
						'fullName' : users[0]['displayName'], 'email' : users[0]['userPrincipalName'], 'depart' : JSON.stringify(department), jobTitles : JSON.stringify(rows), 
						location : JSON.stringify(locations)});
				
					  }else{
					  	console.log('Error while performing Query.'+err);
					  };
					});
				};
				  }else{
				  	console.log('Error while performing Query.'+err);
				  };
				});
		  } 
		});
  }else{
    console.log('Authentication failed!');
  }
});
});


module.exports = router;
