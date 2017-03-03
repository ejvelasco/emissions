module.exports = function(app, connection){
	//POUNDS TO KG FACTOR
	const poundsInKg = 2.20462; 
	app.post('/country-em-kwh', function(req,res){
		//PARAMETERS FROM REQ
		var options = req.body;
		//QUERY DB 
		connection.query('SELECT '+options.truncGHG+' FROM Gas_Em_Kwh_Country WHERE Country = "'+options.country+'"', function(error, results, fields){
			if(error){
				throw error;
			} else{
				//PARSE RESULT
				var countryEm = results[0][options.truncGHG];
				//CONVERT TO POUNDS IF NECESSARY
				if(options.units === 'pounds'){
					countryEm = countryEm * poundsInKg;
				}
				//CALCULATE TOTAL EMISSIONS
				totalCountryEm = countryEm * options.kWh;
				res.json({"result": totalCountryEm});
			}
		});	
	});
}