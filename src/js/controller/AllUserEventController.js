angular.module('Kawaya')
	.controller('AllUserEventController', ['$state','$http', function ($state,$http){
		var controller = this;

		var cors = 'http://cors.io/?u=';
    	// var cors = 'https://crossorigin.me/';

		controller.getAllUser = function(){
			var url = cors + 'http://ime.ist.hokudai.ac.jp/~yamamoto/kawaya/api-json-alluser.cgi';
			$http({
				method: 'GET',
				url: url
			}).then(function successCallback(response){
				var data = response.data.alluser;
				var arr = {};
				for(var i=0;i<data.length;i++){
					arr[data[i].userid] = data[i].name;
				}
				controller.data = arr;

				    url = cors + 'http://ime.ist.hokudai.ac.jp/~yamamoto/kawaya/api-json-alldata.cgi';
				    $http({
				        method: 'GET',
				        url: url
				      }).then(function successCallback(response) {
				          controller.alluserdata = response.data.alldata;
				          var j = 0;
				          for(var i=0;i<controller.alluserdata.length;i++){
				            controller.alluserdata[i].indexID = j++;
				            controller.alluserdata[i].username = controller.data[controller.alluserdata[i].userid];
				          }
				      }, function errorCallback(response) {
				      		console.log('failed');
				     });
					

			}, function errorCallback(response){
				
			});
		};

		controller.getAllUser();

	}]);