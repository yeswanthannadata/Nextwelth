(function(){

  var myapp = angular.module('nextwealth', ["ui.router"])
    myapp.config(function($stateProvider, $urlRouterProvider){
            
      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("/login");
      
      $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: loginCtrl
        })
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html'
        })
  })

  function loginCtrl($scope, $state, $http) {

    $scope.submit = function(username, password) {
  
      var data = $.param({
                   username: username,
                   password: password
                 });

      $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";      

      $http.post('http://projects.headrun.com:8086/apis/nextwealth_login', data).success(function(data, status) {

        console.log(data);
        if ( data["message"] == "Success") {
          $state.go('home');
        }
      });
    }
  }

  myapp.controller("homeCtrl", function($http, $scope) {

    $scope.JDs =[{id:1,name:"JD1"},{id:2,name:"JD2"},{id:3,name:"JD3"}];

    $http.get('http://projects.headrun.com:8086/apis/jds').success(function(data, status) {

        $scope.JDs = data;
    });

    $scope.tableHeaders = [];
    $scope.tableData = {};
      
    $scope.renderTableData = function(JD) {

      var data = $.param({
          jd: JD.name
      });

      $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";      

      $http.post('http://projects.headrun.com:8086/apis/candidates', data).success(function(data, status) {

        $scope.tableHeaders = data.tableHeaders;
        $scope.tableData = data.tableData;
      });
    } 
  })

}());
