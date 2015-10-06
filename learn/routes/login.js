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


/* GET users listing. */
router.post('/', function(req, res, next) {
  // res.send('respond with a resource');
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
	    var config_v2 = { url: 'ldap://leopard.cmass.criticalmass.com',
               baseDN: 'dc=cmass,dc=criticalmass,dc=com',
               username: username,
               password: password

           }
	    var query = 'mail='+username+'';
	    var ad_v2 = new ActiveDirectory(config_v2);

		ad_v2.findUsers(query, true, function(err, users) {
		  if (err) {
		    console.log('ERROR: ' +JSON.stringify(err));
		    return;
		  }

		  if ((! users) || (users.length == 0)) console.log('No users found.');
		  else {
		  	connection.connect();
		  	var ind = username.indexOf('@');
			var domainName = username.slice(0,ind);
			console.log(domainName);
			connection.query('SELECT * from people where domainName = "'+domainName+'"', function(err, rows, fields) {
			  if (!err)
			  	if (!rows) {
			  		console.log('The person: ', rows);
			  	}else{
			  		console.log('No User Found');
			  	};
			    
			  else
			    console.log('Error while performing Query.'+err);
			});

			connection.end();
		  	// res.redirect('/home', { title: 'CM Learn' });

		    console.log('findUsers: '+JSON.stringify(users));
		  }
		});
	}
  else {
    console.log('Authentication failed!');
  }
});
});





module.exports = router;
