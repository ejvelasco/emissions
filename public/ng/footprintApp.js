const footprintApp = angular.module('footprintApp', [])
	.controller('countryCO2kWh', ['$scope','$http', function($scope, $http) {
		//POPULATE COUNTRY DATALIST
		$http.get('/country-list')
		.success(function(data){
			$scope.countryList = data.countries;
		})
		.error(function(data, status){
			console.error('Error', status, data);
		});
		//SET UP OPTIONS
		$scope.options = {
			country: '',
			GHG: '',
			kWh: '',
			units: '',
			result: 0
		}
		//CALCULATE FUNCTION
		$scope.calculate = function(opts){
			//HANDLE EMPTY FIELDS
			for(option in opts){
				if(opts[option] === ''){
					console.log('enter all');
					alert('Please enter all of the parameters provided.');
					return;
				}
			}
			//TRUNCATE GREEN HOUSE GAS
			opts.truncGHG = opts.GHG.substring(opts.GHG.length - 4, opts.GHG.length - 1);
			//CALCULATION REQUEST
			$http.post('/country-em-kwh', opts)
			.success(function(data){
				//SET RESULT
				opts.result = data.result;
				//FIX UNITS
				opts.resultUnits = opts.units;
			})
			.error(function(data, status){
				console.error('Error', status, data);
			});
		}
	}]);