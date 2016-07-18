angular.module('Kawaya', ['ui.router'])
  .controller('MainController', ['$state', function () {
  	var controller = this;
  	//all user data
  	var allUserData = getAllUserData();


  	controller.allUserData = allUserData;


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
	 }
	];
}