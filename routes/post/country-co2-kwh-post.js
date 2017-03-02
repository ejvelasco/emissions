module.exports = function(app, connection){
	const poundsInKg = 2.20462; 
	app.post('/country-co2-kwh', function(req,res){
		var options = req.body;
		console.log(options);
		connection.query('SELECT '+options.truncGHG+' FROM Gas_Em_Kwh_Country WHERE Country = "'+options.country+'"', function(error, results, fields){
			if(error){
				throw error;
			} else{
				var countryEm = results[0][options.truncGHG];
				if(options.units === 'pounds'){
					countryEm = countryEm * poundsInKg;
				}
				totalCountryEm = countryEm * options.kWh;
				res.json({"result": totalCountryEm});
			}
		});
		
	});
}