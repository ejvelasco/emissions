module.exports = function(app){
	//DEFINE VIEW ROUTES
	app.get('/', function(req,res){
		res.render('main');
	});
}