angular.module('Kawaya')
.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "src/view/home.tmpl",
      controller: 'MainController as MainCtrl'
    })

    .state('user', {
      url: "/user/:userID",
      templateUrl: "src/view/userevent.tmpl"
    })

    .state('alluser',{
      url: "/alluser",
      templateUrl: "src/view/alluserevent.tmpl"
    })
});
