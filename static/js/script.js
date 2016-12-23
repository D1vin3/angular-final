var app = angular.module('app', ['ngRoute', 'ngStorage']);


// app.run(function($localStorage, $sessionStorage) {});

app.controller('appCtrl', function($scope, $localStorage){
  console.log('appcTRl is working');

})



app.controller('logCtrl', function($scope, myFactory, $localStorage){
  console.log('LogCTRl');
  $scope.myFactory = myFactory;

  $scope.signOut = function(){
    $localStorage.bool = false;
    $scope.myFactory.loggedIn = $localStorage.bool;
  }
})



app.controller('regCtrl', function($scope, $http, myFactory){
  console.log('regCtrl in process');
  $scope.myFactory = myFactory;

  $scope.signUp = function(){
    // console.log('data is ', $scope.name, $scope.surname, $scope.email, $scope.password);
    var url = "http://localhost/web/final/php/signup.php";
    $http.get(url + "?email=" +$scope.email + "&password=" + $scope.password + "&name="+ $scope.name + "&surname=" + $scope.surname)
      .then(function(response) {
      if(response.data == $scope.email  ){
        $scope.myFactory.loggedIn = true;
        $scope.myFactory.nick = $scope.name;
        alert('wp');
      }else{
        alert ("error");
      }
    });
  } 
})


app.controller('loginCtrl',function($scope, $http, $localStorage, myFactory){
  $scope.myFactory = myFactory;

  $scope.signIn = function(){
    var url = "http://localhost/web/final/php/signin.php";
    $http.get(url+"?email="+ $scope.email + "&password=" + $scope.password)
      .then(function(response){
        if (response.data==$scope.email){
          alert("loggedIn");
          $localStorage.nick = $scope.email;
          $localStorage.bool = true;
          myFactory.loggedIn = $localStorage.bool;
          myFactory.nick = $localStorage.nick;
        }else{
          alert('log Error');
        }
      })
  }
})



app.factory('myFactory', function($localStorage){
  return {
    loggedIn: $localStorage.bool,
    nick: $localStorage.nick
  }
})


app.controller('postsCtrl', function($scope, postsFactory){
  console.log("postsFactory", postsFactory);
  $scope.posts = postsFactory;
})

app.controller('postCtrl', function($scope, $routeParams, postsFactory){
  // console.log($routeParams.postId);
  var postId = Number($routeParams.postId);
  $scope.post = _.findWhere(postsFactory, {id: postId});
})

app.factory('postsFactory', function(){
  return [
    {
      id: 1,
      name: 'Post 1 AngularJS'
    },
    {
      id: 2,
      name: 'Post 2 AngularJS'
    },
    {
      id: 3,
      name: 'Post 3 AngularJS'
    }
  ]
})


app.config(function($routeProvider){ 
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html'
    })
    .when('/posts', {
      templateUrl: 'templates/posts.html',
      controller: 'postsCtrl'
    })
    .when('/posts/:postId', {
      templateUrl: 'templates/post.html',
      controller: 'postCtrl'
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
    .otherwise({
      templates: '404 no such page'
    })
  })





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
