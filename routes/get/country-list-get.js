module.exports = function(app, connection){
	app.get('/country-list', function(req,res){
		//GET COUNTRY LIST FROM DB
		connection.query('SELECT Country FROM Gas_Em_Kwh_Country', function(error, results, fields){
			if(error){
				throw error;
			} else{
				//PARSE RESULTS
				var countryList = results;
				var parsedCountryList = {
					countries: []
				}; 
				for(country in countryList){
					parsedCountryList.countries.push(countryList[country].Country);
				}
				//SEND RESPONSE
				res.json(parsedCountryList);
			}
		});
	});
}