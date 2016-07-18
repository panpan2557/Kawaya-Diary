angular.module('Kawaya')
.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "src/view/home.tmpl"
    })
    .state('user', {
      url: "/user/:userID",
      templateUrl: "src/view/userevent.tmpl"
    })
});
