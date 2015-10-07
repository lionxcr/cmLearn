var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    
    res.render('home', { title: 'Lean Home'});
 	console.log("Cookie :  ", req.cookies['learn']);
});

module.exports = router;
