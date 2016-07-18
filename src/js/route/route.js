angular.module('Kawaya')
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "src/view/home.tmpl"
    })
    .state('userevent', {
      url: "/userevent",
      templateUrl: "src/view/userevent.tmpl"
    })
});
