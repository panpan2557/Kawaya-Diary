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
          var j = 0;
          for(var i=0;i<controller.indv.length;i++){
            controller.indv[i].indexID = j++;
          }
        
      }, function errorCallback(response) {
     });
  };

  controller.getIndividual(controller.userID);


      controller.data = [
       { "userid":"100001", "date":"2016/07/12","time":"14:01:58",
         "bristol":"6","devid":"8964dc8240430f28",
         "lat":"43.0546","lon":"141.341","ipaddr":"192.50.101.187"
       },
       { "userid":"100001", "date":"2016/07/12","time":"14:05:45",
         "bristol":"2","devid":"8964dc8240430f28",
         "lat":"43.0546","lon":"141.341","ipaddr":"192.50.101.187"
       },
       { "userid":"100001", "date":"2016/07/15","time":"04:35:00",
         "bristol":"2","devid":"155eb38dc8cd8f2",
         "lat":"43.0763316","lon":"141.3386866","ipaddr":"175.131.142.212"
       },
       { "userid":"100001", "date":"2016/07/15","time":"13:47:27",
         "bristol":"5","devid":"155eb38dc8cd8f2",
         "lat":"43.0763316","lon":"141.3386866","ipaddr":"133.87.132.68"
       }
      ];
  }
]);



