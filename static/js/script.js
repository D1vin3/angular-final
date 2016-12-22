var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){ 
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html'
    })
    .when('/posts', {
      template: '<h1>Hello world</h1>'
    })
  })



// app.controller("appCtrl1", function($scope, $http){
//   $scope.callPopup = function(){
//     $scope.popup = {
//       "display": "block"
//     }
//   }


//   $scope.getContent = function() {
//   var url = "http://localhost/Midterm2/content.php";
//   $http.get(url + "?mail=" +$scope.mail + "&password=" + $scope.password ).then(function(response) {
//     if(response.data == "ok"){
//       console.log("hello");
//         $scope.popup2 = {
//           "display": "block"
//         }
//         $scope.popup = {
//           "display": "none"
//         }
//     }
//     });

//   }
// })
