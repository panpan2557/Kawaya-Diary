angular.module('Kawaya')
	.controller('AllUserEventController', ['$state', '$http', '$scope', function ($state, $http, $scope){
		
		$scope.loaded = false;

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
				          //for sorting
				          controller.dates = new Set();
				          controller.bristols = [1,2,3,4,5,6,7];
				          var j = 0;
				          for(var i = 0; i < controller.alluserdata.length; i++){
				          	controller.dates.add(controller.alluserdata[i].date);
				            controller.alluserdata[i].indexID = j++;
				            controller.alluserdata[i].username = controller.data[controller.alluserdata[i].userid];
				          }

				          controller.dates = Array.from(controller.dates);

				          $scope.loaded = true;
				      }, function errorCallback(response) {
				      		console.log('failed');
				     });
					

			}, function errorCallback(response){
				
			});
		};

		controller.getAllUser();

		//init the bristol model first
	    $scope.select = {
	      bristol: ""
	    }

	    //custom filter the bristol
	    $scope.bristolFilter = function(event) {
	      //"" == Any
	      if ($scope.select.bristol == "")
	        return true;
	      return event.bristol === $scope.select.bristol;
	    };

	}]);