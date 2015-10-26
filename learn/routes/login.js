var express = require('express');
var router = express.Router();

var ActiveDirectory = require('activedirectory');
var config = { 	url: 'ldap://leopard.cmass.criticalmass.com',
               	baseDN: 'dc=cmass,dc=criticalmass,dc=com',
           		attributes: {
	                user: [ 'sAMAccountName','displayName','givenName','manager','title','department','l','co','mail' ]
               }}

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
	        password: 'j!ve2013',
           	attributes: {
                user: [ 'sAMAccountName','displayName','givenName','manager','title','department','l','co','mail' ]
           }
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
		  		console.log(users);
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
					connection.query('SELECT * from tiers', function(err, rows, fields) {
					  if (!err){
					  	var config_v3 = { 
					    	url: 'ldap://leopard.cmass.criticalmass.com',
					        baseDN: 'ou=CriticalMass,dc=cmass,dc=criticalmass,dc=com',
					      	username: 'jiveldap',
					        password: 'j!ve2013',
				           	attributes: {
				                user: [ 'sAMAccountName','mail' ]
				           }
					    }
					    var managerName = users[0]['manager'];
					    managerName = managerName.replace(',OU=CriticalMass,DC=cmass,DC=criticalmass,DC=com', '');
					    managerName = managerName.replace(',OU=Users,', '');
					    managerName = managerName.replace('CN=', '');
					    var locationOU = ['OU=LATAM'];
					    var xy = 0;
					    while(xy <= locationOU.length){
					    	if (managerName.match("OU=")) {
					    		managerName = managerName.replace(locationOU[xy], '');
					    	};
					    	xy++;
					    }
					    console.log(managerName);
					    var query = 'displayName='+managerName+'';
					  	var ad_v3 = new ActiveDirectory(config_v3);
						ad_v3.find(query, function(err, results) {
						  if ((err) || (! results)) {
						    console.log('ERROR: ' + JSON.stringify(err));
						    return;
						  }
						  users[0]['managerInfo'] = results['users'];
						  users[0]['manager'] = managerName;
						  res.render('newUser', { title: 'CM Learn Welcome', 'name' : users[0]['givenName'], 'domainName' : users[0]['sAMAccountName'], 
							'fullName' : users[0]['displayName'], 'email' : users[0]['mail'],'department': users[0]['department'], 'jobTitle' : users[0]['title'],
							'location' : users[0]['l'], 'country' : users[0]['co'], 'manager' : users[0]['manager'], 'managerEmail' : users[0]['managerInfo'][0]['mail'], 'managerDomain' : users[0]['managerInfo'][0]['sAMAccountName'], jobTitles : JSON.stringify(rows)});
						});
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
