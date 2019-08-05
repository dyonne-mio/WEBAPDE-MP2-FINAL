var express = require('express');
var router = express.Router();
var Users = require('../models/users.js');
var Prompts = require('../models/prompts.js');

router.get('/', function(req, res, next) {
	var user = false;

	Users.findOne({
		username : req.session.username
	},
	async function(err, user){
		var prompts = await Prompts.find().limit(5).sort({
			follow_count : 'desc'
		});
		res.render('index', { 
			user : user,
			prompts : prompts
		});
	});    
});

router.get('/sign-up\/?', function(req, res, next) {
	if(req.session.username){
		res.redirect('/');
	}
	res.render('sign-up');
});

router.get('/not-found\/?', function(req, res, next) {
	res.render('404');
});



module.exports = router;