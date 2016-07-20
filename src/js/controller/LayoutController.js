angular.module('Kawaya')
	.controller('LayoutController', ['$state', function ($state){
		var controller = this;
		controller.gotoAllUserMode = function(){
			$state.go('alluser');
		};
		controller.gotoUserMode = function(){
			$state.go('home');
		}
	}]);