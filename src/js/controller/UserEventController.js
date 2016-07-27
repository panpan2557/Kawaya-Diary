angular.module('Kawaya')
  .controller('UserEventController', ['$http', '$state', '$stateParams','$scope', '$rootScope',function ($http, $state, $stateParams,$scope,$rootScope) {
    //for loading animation
    $scope.loaded = false;

    var cors = 'http://cors.io/?u=';
    // var cors = 'https://crossorigin.me/';

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
      url = cors + 'http://ime.ist.hokudai.ac.jp/~yamamoto/kawaya/api-json-getuser.cgi?userid=' + userID;
      $http({
        method: 'GET',
        url: url
      }).then(function successCallback(response) {
          controller.userdata = response.data;
      }, function errorCallback(response) {
     });
    };

    function loadChart() {
      var drawChart = function() {
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'ฺBristol');
        data.addColumn('number', 'Total');
        tempData = controller.bristolChartData;
        data.addRows(tempData);

        // Set chart options
        var options = {
          title: 'All Bristol Summary',
          width: 400,
          height: 300,
          pieHole: 0.4,
          fontSize: 15,
          pieSliceTextStyle: {
            bold: true,
            color: 'white'
          },
          titleTextStyle: {
            bold: false
          }
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
      google.charts.setOnLoadCallback(drawChart);
    }

    //wait for API to finish
    controller.getIndividual = function(userID){
      url = cors + 'http://ime.ist.hokudai.ac.jp/~yamamoto/kawaya/api-json-userdata.cgi?userid=' + userID;
      $http({
          method: 'GET',
          url: url
        }).then(function successCallback(response) {
            controller.indv = response.data.userdata;
            //for sorting
            controller.dates = new Set();
            controller.bristols = [1,2,3,4,5,6,7];
            //for chart
            controller.bristolChartData = [
              ['1', 0],
              ['2', 0],
              ['3', 0],
              ['4', 0],
              ['5', 0],
              ['6', 0],
              ['7', 0]
            ];

            var j = 0;
            for(var i=0; i < controller.indv.length; i++){
              controller.dates.add(controller.indv[i].date);
              controller.bristolChartData[controller.indv[i].bristol-1][1]++;
              controller.indv[i].indexID = j++;
            }

            loadChart();

            controller.dates = Array.from(controller.dates);

            $scope.loaded = true;
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



