angular.module('Kawaya')
  .controller('UserEventController', ['$http', '$state', '$stateParams', function ($http, $state, $stateParams) {
  	
  	function getUserInfo(userID) {
  		console.log(userID);
		var obj = $http.jsonp("http://ime.ist.hokudai.ac.jp/~yamamoto/kawaya/api-json-getuser.cgi?userid=" + userID);
		return JSON.parse(JSON.stringify(obj));	
	}

  	var controller = this;
  	getUserInfo($stateParams.userID);
  	controller.userID = $stateParams.userID

  }
]);



