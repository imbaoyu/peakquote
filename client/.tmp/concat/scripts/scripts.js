'use strict';
var services = angular.module('peakquoteApp.quoteService', [
    'ngResource',
    'ngRoute'
  ]);
services.factory('Quote', [
  '$resource',
  function ($resource) {
    return $resource('/quotes/:id', { id: '@id' });
  }
]);
services.factory('MultiQuoteLoader', [
  'Quote',
  '$q',
  function (Quote, $q) {
    return function () {
      var delay = $q.defer();
      Quote.query(function (quotes) {
        delay.resolve(quotes);
      }, function () {
        delay.reject('Unable to fetch quotes');
      });
      return delay.promise;
    };
  }
]);
services.factory('QuoteLoader', [
  'Quote',
  '$route',
  '$q',
  function (Quote, $route, $q) {
    return function () {
      var delay = $q.defer();
      Quote.get({ id: $route.current.params.Id }, function (quote) {
        delay.resolve(quote);
      }, function () {
        delay.reject('Unable to fetch quote ' + $route.current.params.Id);
      });
      return delay.promise;
    };
  }
]);
'use strict';
var services = angular.module('peakquoteApp.userService', [
    'ngResource',
    'ngRoute'
  ]);
services.factory('User', [
  '$resource',
  function ($resource) {
    return $resource('/users/:id', { id: '@id' });
  }
]);
services.factory('MultiUserLoader', [
  'User',
  '$q',
  function (User, $q) {
    return function () {
      var delay = $q.defer();
      User.query(function (users) {
        delay.resolve(users);
      }, function () {
        delay.reject('Unable to fetch users');
      });
      return delay.promise;
    };
  }
]);
'use strict';
var app = angular.module('peakquoteApp.quoteController', []);
app.controller('QuoteListCtrl', [
  '$scope',
  'quotes',
  function ($scope, quotes) {
    $scope.quotes = quotes;
  }
]);
app.controller('QuoteViewCtrl', [
  '$scope',
  '$location',
  'quote',
  function ($scope, $location, quote) {
    $scope.quote = quote;
    $scope.edit = function () {
      $location.path('/quotes/edit/' + quote.id);
    };
  }
]);
app.controller('QuoteEditCtrl', [
  '$scope',
  '$location',
  'quote',
  function ($scope, $location, quote) {
    $scope.quote = quote;
    $scope.save = function () {
      $scope.quote.$save(function (quote) {
        $location.path('/quotes/view/' + quote.id);
      });
    };
    $scope.remove = function () {
      delete $scope.quotes;
      $location.path('/');
    };
  }
]);
app.controller('QuoteNewCtrl', [
  '$scope',
  '$location',
  'Quote',
  function ($scope, $location, Quote) {
    $scope.quote = new Quote({});
    $scope.save = function () {
      $scope.quote.$save(function (quote) {
        $location.path('/quotes/view/' + quote.id);
      });
    };
  }
]);
'use strict';
var app = angular.module('peakquoteApp.userController', []);
app.controller('UserListCtrl', [
  '$scope',
  'users',
  function ($scope, users) {
    $scope.users = users;
  }
]);
app.controller('UserNewCtrl', [
  '$scope',
  '$location',
  'User',
  function ($scope, $location, User) {
    $scope.user = new User({ admin: false });
    $scope.save = function () {
      $scope.user.$save(function () {
        $location.path('/users/list');
      });
    };
  }
]);
'use strict';
angular.module('peakquoteApp', [
  'peakquoteApp.quoteController',
  'peakquoteApp.quoteService',
  'peakquoteApp.userController',
  'peakquoteApp.userService',
  'ngRoute'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      controller: 'QuoteListCtrl',
      resolve: {
        quotes: [
          'MultiQuoteLoader',
          function (MultiQuoteLoader) {
            return new MultiQuoteLoader();
          }
        ]
      },
      templateUrl: 'views/quoteList.html'
    }).when('/quotes/view/:Id', {
      controller: 'QuoteViewCtrl',
      resolve: {
        quote: [
          'QuoteLoader',
          function (QuoteLoader) {
            return new QuoteLoader();
          }
        ]
      },
      templateUrl: 'views/quoteView.html'
    }).when('/quotes/edit/:Id', {
      controller: 'QuoteEditCtrl',
      resolve: {
        quote: [
          'QuoteLoader',
          function (QuoteLoader) {
            return new QuoteLoader();
          }
        ]
      },
      templateUrl: 'views/quoteForm.html'
    }).when('/quotes/new', {
      controller: 'QuoteNewCtrl',
      templateUrl: 'views/quoteForm.html'
    }).when('/users/new', {
      controller: 'UserNewCtrl',
      templateUrl: 'views/userForm.html'
    }).when('/users/list', {
      controller: 'UserListCtrl',
      resolve: {
        users: [
          'MultiUserLoader',
          function (MultiUserLoader) {
            return new MultiUserLoader();
          }
        ]
      },
      templateUrl: 'views/userList.html'
    }).otherwise({ redirectTo: '/' });
  }
]);