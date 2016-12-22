var app = angular.module('app', ['ngRoute']);


app.controller('appCtrl', function($scope){
  console.log('appcTRl is working');
  // $scope.loggedIn = false;
})

app.controller('logCtrl', function($scope){
  console.log('LogCTRl');
  $scope.loggedIn = false;
  $scope.nick = "D1vin3";

})

app.config(function($routeProvider){ 
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html'
    })
    .when('/posts', {
      templateUrl: 'templates/posts.html'
    })
    .when('/signin', {
      templateUrl: 'templates/signin.html'
    })
    .when('/signup', {
      templateUrl: 'templates/signup.html'
    })
    .when('/shop',{
      templateUrl: 'templates/shop.html'
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
