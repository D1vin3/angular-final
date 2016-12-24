var app = angular.module('app', ['ngRoute', 'ngStorage']);


// app.run(function($localStorage, $sessionStorage) {});

app.controller('appCtrl', function($scope, $localStorage, $location){
  console.log('appcTRl is working');

  $scope.filterChange = function(){
    $location.path("search/");
  }
})



app.controller('logCtrl', function($scope, myFactory, $localStorage){
  console.log('LogCTRl');
  $scope.myFactory = myFactory;

  $scope.signOut = function(){
    $localStorage.bool = false;
    $scope.myFactory.loggedIn = $localStorage.bool;
  }
})



app.controller('regCtrl', function($scope, $http, myFactory, $location){
  console.log('regCtrl in process');
  $scope.myFactory = myFactory;

  $scope.signUp = function(){
    var url = "http://localhost/web/final/php/signup.php";
    $http.get(url + "?email=" +$scope.email + "&password=" + $scope.password + "&name="+ $scope.name + "&surname=" + $scope.surname)
      .then(function(response) {
      if(response.data == $scope.email  ){
        $scope.myFactory.loggedIn = true;
        $scope.myFactory.nick = $scope.name;
        $location.path("/");

      }else{
        alert ("error");
      }
    });
  } 
})


app.controller('loginCtrl',function($scope, $http, $localStorage, myFactory, $location){
  $scope.myFactory = myFactory;

  $scope.signIn = function(){
    var url = "http://localhost/web/final/php/signin.php";
    $http.get(url+"?email="+ $scope.email + "&password=" + $scope.password)
      .then(function(response){
        if (response.data==$scope.email){
          $localStorage.nick = $scope.email;
          $localStorage.bool = true;
          myFactory.loggedIn = $localStorage.bool;
          myFactory.nick = $localStorage.nick;
          $location.path("/");

        }else{
          alert('log Error');
        }
      })
  }
})

app.controller('cartCtrl', function($scope, $localStorage, myFactory){
  $scope.cart = JSON.parse(localStorage.getItem(myFactory.nick));
  var i = $scope.cart.length; 
  $scope.total = $scope.cart[i-1]['total'];


})



app.factory('myFactory', function($localStorage){
  return {
    loggedIn: $localStorage.bool,
    nick: $localStorage.nick
  }
})


app.controller('postsCtrl', function($scope, postsFactory){
  $scope.posts = postsFactory;
})

app.controller('postCtrl', function($scope, $routeParams, postsFactory){
  var postId = Number($routeParams.postId);
  $scope.post = _.findWhere(postsFactory, {id: postId});
})

app.controller('homeCtrl', function($scope, categoryFactory){
  console.log('homeCtrl is working');
  $scope.categories = categoryFactory.slice(0,3);
})

app.controller('homeCategoryCtrl', function($scope, $routeParams, categoryFactory, myFactory, $localStorage){
  var categoryType = $routeParams.categoryType;
  $scope.goods = _.filter(categoryFactory, {category: categoryType});
  $scope.options = categoryFactory;

  $scope.cart = JSON.parse(localStorage.getItem(myFactory.nick)) || [];
  var j = $scope.cart.length;
  if(j>0){
    $scope.total = $scope.cart[j-1]['total'];
  }else{
    $scope.total = Number();
  }

  $scope.checkItem = function(i){
    $scope.total+=$scope.options[i]['price'];
    $scope.cart.push({
      cat: $scope.options[i]['category'],
      name: $scope.options[i]['goodName'],
      desc: $scope.options[i]['goodDescr'],
      price: $scope.options[i]['price'],
      img : $scope.options[i]['img'],
      total: $scope.total
    });
    localStorage.setItem(myFactory.nick, JSON.stringify($scope.cart));

    alert($scope.total);
    console.log($scope.cart);
    alert('added successfully');

  }
})


app.controller('searchCtrl', function($scope, categoryFactory){

  // console.log('searchCtrl is working');
  $scope.options = categoryFactory;

  $scope.result = $scope.options.filter(function(el){
    return (el.category.toLowerCase().includes($scope.filter_value) ||
            el.goodName.toLowerCase().includes($scope.filter_value) ||
            el.goodDescr.toLowerCase().includes($scope.filter_value)||
            el.img.toLowerCase().includes($scope.filter_value)
      );
  })
  console.log($scope.result);

  $scope.selectRes = function(result){
    $scope.res_category = result['category'];
    $scope.res_description = result['goodDescr'];
    $scope.res_price = result['price'];
    $scope.res_img = result['img'];
  }
})


app.factory('categoryFactory', function(){
  return [
    {
      id: 1,
      category: 'Women', 
      imgSrc: 'women.jpg', 
      goodName: 'Coat', 
      goodDescr: 'Nice coat',
      img: 'coat.jpg',
      price: 500,
    },
    {
      id: 2,
      category: 'Men',
      imgSrc: 'man.jpg',
      goodName: 'Shift',
      goodDescr: 'Dark shirt',
      img: 'shirt.jpg',
      price: 600,
    },
    {
      id: 3,
      category: 'Kids',
      imgSrc: 'kids.jpg',
      goodName: 'Shorts',
      goodDescr: 'Set',
      img: 'kid1.jpg',
      price: 900,
    },
    {
      id: 4,
      category: 'Women',
      goodName: 'Dress',
      goodDescr: 'Summer dress',
      img: 'dress2.jpg',
      price: 500,
    },
    {
      id: 5,
      category: 'Men',
      goodName: 'Jacket',
      goodDescr: 'Light jacket',
      img: 'jacket2.jpg',
      price: 500,
    },
    {
      id: 6,
      category: 'Kids',
      goodName: 'Candies',
      goodDescr: 'Really big candies',
      img: 'kid2.jpg',
      price: 500,
    },
    {
      id: 7,
      category: 'Women',
      goodName: 'Dress',
      goodDescr: 'Nice dress',
      img: 'dress.jpg',
      price: 600,
    },
    {
      id: 8,
      category: 'Men',
      goodName: 'Jacket',
      goodDescr: 'Warm jacket',
      img: 'jacket.jpg',
      price: 500,
    },
    {
      id: 9,
      category: 'Kids',
      goodName: 'Jeans',
      goodDescr: '4-5y jeans',
      img: 'kid3.jpeg',
      price: 300,
    },

  ]
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
      templateUrl: 'templates/home.html',
      controller: 'homeCtrl'
    })
    .when('/goods/:categoryType', {
      templateUrl: 'templates/goods.html',
      controller: 'homeCategoryCtrl'
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
    .when('/search', {
      templateUrl: 'templates/search.html',
      controller: 'searchCtrl'
    })
    .when('/shop',{
      templateUrl: 'templates/shop.html'
    })
    .when('/good', {
      templateUrl: 'templates/good.html'
    })
    .when('/cart',{
      templateUrl: 'templates/cart.html',
      controller: 'cartCtrl'
    })
    .otherwise({
      templates: '404 no such page'
    })
  })




