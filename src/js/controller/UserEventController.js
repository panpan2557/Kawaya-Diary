angular.module('Kawaya')
  .controller('UserEventController', ['$http', '$state', '$stateParams','$scope', '$rootScope',function ($http, $state, $stateParams,$scope,$rootScope) {

    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      // Create the data table.
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Slices');
      data.addRows([
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
      ]);

      // Set chart options
      var options = {'title':'How Much Pizza I Ate Last Night',
                     'width':400,
                     'height':300};

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }

    var controller = this;
    controller.userID = $stateParams.userID;
    getUserInfo($stateParams.userID);

    controller.calAge = function(bd){
        var agediff = Date.now() - new Date(bd);
        var ageDate = new Date(agediff);
        return Math.abs(ageDate.getUTCFullYear()-1970);
     };

     $rootScope.$on('$stateChangeSuccess', function() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    
    function getUserInfo(userID) {
      console.log(userID);
      controller.userID = userID;
      url = 'https://crossorigin.me/' + 'http://ime.ist.hokudai.ac.jp/~yamamoto/kawaya/api-json-getuser.cgi?userid=' + userID;
      $http({
        method: 'GET',
        url: url
      }).then(function successCallback(response) {
          controller.userdata = response.data;
      }, function errorCallback(response) {
     });
    };

    //wait for API to finish
    controller.getIndividual = function(userID){
      url = 'https://crossorigin.me/' + 'http://ime.ist.hokudai.ac.jp/~yamamoto/kawaya/api-json-userdata.cgi?userid=' + userID;
      $http({
          method: 'GET',
          url: url
        }).then(function successCallback(response) {
            controller.indv = response.data.userdata;
            //for sorting
            controller.dates = new Set();
            controller.bristols = [1,2,3,4,5,6,7];
            var j = 0;
            for(var i=0; i < controller.indv.length; i++){
              controller.dates.add(controller.indv[i].date);
              controller.indv[i].indexID = j++;
            }
            controller.dates = Array.from(controller.dates);
        }, function errorCallback(response) {
       });
    };

    controller.getIndividual(controller.userID);

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

  }
]);



