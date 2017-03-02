module.exports = function(app, connection){
	app.get('/country-list', function(req,res){
		connection.query('SELECT Country FROM Gas_Em_Kwh_Country', function(error, results, fields){
			if(error){
				// res.sendStatus(500);
				throw error;
			} else{
				// console.log(results[0]);
				var countryList = results;
				var parsedCountryList = {
					countries: []
				}; 
				for(country in countryList){
					parsedCountryList.countries.push(countryList[country].Country);
				}
				res.json(parsedCountryList);
			}
		})
	});
}