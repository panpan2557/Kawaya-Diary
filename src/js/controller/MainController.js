angular.module('Kawaya', ['ui.router'])
  .controller('MainController', ['$state','$http','$scope', function ($state , $http, $scope) {
  	var controller = this;

  	var cors = 'http://cors.io/?u=';
    // var cors = 'https://crossorigin.me/';

  	controller.sortBy = function(propName){
			// controller.reverse = (controller.propName === propName)? !controller.reverse : false;
			controller.propName = propName;
	};

	controller.calAge = function(bd){
		var agediff = Date.now() - new Date(bd);
		var ageDate = new Date(agediff);
		return Math.abs(ageDate.getUTCFullYear()-1970);
	};

	controller.goToUser = function(userID) {
		console.log(userID);
		$state.go('user', {userID: userID});
	};

	controller.getAll = function(){
		var url = cors + 'http://ime.ist.hokudai.ac.jp/~yamamoto/kawaya/api-json-alluser.cgi';
		var req = {
  			method: 'GET',
  			url: url
		};
		$http(req).then(function successCallback(response) {
    		// console.log(response.data.alluser);
    		controller.allUserData = response.data.alluser;
  		}, function errorCallback(response) {
  		   console.log("failed");
 		 });
	};

	//all user data
  	controller.propName = null;
	controller.getAll();

  }
 ]);