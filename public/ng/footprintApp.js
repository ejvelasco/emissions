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
		$scope.options = {
			country: '',
			GHG: '',
			kWh: '',
			units: '',
			result: 0
		}
		$scope.calculate = function(opts){
			console.log(opts);
			for(option in opts){
				if(opts[option] === ''){
					console.log('enter all');
					alert('Please enter all of the parameters provided.');
					return;
				}
			}
			opts.truncGHG = opts.GHG.substring(opts.GHG.length - 4, opts.GHG.length - 1);
			console.log(opts);
			$http.post('/country-co2-kwh', opts)
			.success(function(data){
				console.log(data.result);
				opts.result = data.result;
				opts.resultUnits = opts.units;
				console.log($scope.options.result);
			})
			.error(function(data, status){
				console.error('Error', status, data);
			});
		}
	}]);