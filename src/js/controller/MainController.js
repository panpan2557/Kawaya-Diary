angular.module('Kawaya', ['ui.router'])
  .controller('MainController', ['$state','$http','$scope', function ($state , $http, $scope) {
  	var controller = this;

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
		var url = 'https://crossorigin.me/' + 'http://ime.ist.hokudai.ac.jp/~yamamoto/kawaya/api-json-alluser.cgi';
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


function getAllUserData() {
	return [
	 { "userid":"100001", "name":"Tsuyoshi Yamamoto","sex":"M",
	   "dob":"1953/12/16","contact":"1953/12/16"
	 },
	 { "userid":"100002", "name":"Kitta Takeshi","sex":"M",
	   "dob":"1953/12/16","contact":"1953/12/16"
	 },
	 { "userid":"100003", "name":"Amano Maho","sex":"F",
	   "dob":"1953/12/16","contact":"1953/12/16"
	 },
	 { "userid":"100005", "name":"Yamakawa Takuya","sex":"M",
	   "dob":"1953/12/16","contact":"1953/12/16"
	 },
	 { "userid":"200001", "name":"Cynthia Paule","sex":"F",
	   "dob":"1954/07/02","contact":"1954/07/02"
	 },
	 { "userid":"200002", "name":"Rebecca Rayborn","sex":"F",
	   "dob":"1953/12/16","contact":"1953/12/16"
	 },
	 { "userid":"200003", "name":"Yamada Taro","sex":"M",
	   "dob":"2000/01/01","contact":"2000/01/01"
	 },
	 { "userid":"200004", "name":"Yamada Taro","sex":"M",
	   "dob":"2000/01/01","contact":"2000/01/01"
	 },
	 { "userid":"100004", "name":"山本 強","sex":"M",
	   "dob":"1953/12/16","contact":"1953/12/16"
	 },
	];
}