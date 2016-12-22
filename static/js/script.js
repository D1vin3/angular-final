var app = angular.module('app', ['ngRoute']);


app.controller('appCtrl', function($scope){
  console.log('appcTRl is working');
  // $scope.loggedIn = false;
})



app.controller('logCtrl', function($scope, myFactory){
  console.log('LogCTRl');
  $scope.myFactory = myFactory;
})



app.controller('regCtrl', function($scope, $http, myFactory){
  console.log('regCtrl in process');
  $scope.myFactory = myFactory;

  $scope.signUp = function(){
    console.log('data is ', $scope.name, $scope.surname, $scope.email, $scope.password);

    var url = "http://localhost/web/final/php/signup.php";
    $http.get(url + "?email=" +$scope.email + "&password=" + $scope.password + "&name="+ $scope.name + "&surname=" + $scope.surname)
      .then(function(response) {
      if(response.data == $scope.name){
        $scope.myFactory.loggedIn = true;
        $scope.myFactory.nick = $scope.name;
        alert('wp');
      }else{
        alert ("error");
      }
    });
  } 
})


// app.controller('loginCtrl', function($scope, $http, myFactory){
//   $scope.myFactory = myFactory;

//   $scope.signIn = function(){
//     var url = "http://localhost/web/final/php/signin.php";
//     $http.get(url+)
//   }
// })


app.factory('myFactory', function(){
  return {
    loggedIn: false,
    nick: "nick"
  }
})

app.config(function($routeProvider){ 
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html'
    })
    .when('/posts', {
      templateUrl: 'templates/posts.html'
    })
    .when('/posts/:postId', {

    })
    .when('/signin', {
      templateUrl: 'templates/signin.html',
      controller: 'loginCtrl'
    })
    .when('/signup', {
      templateUrl: 'templates/signup.html',
      controller: 'regCtrl'
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
