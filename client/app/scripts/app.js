'use strict';

angular.module('peakquoteApp', ['peakquoteApp.quoteController',
																'peakquoteApp.quoteService',
																'peakquoteApp.userController',
																'peakquoteApp.userService',
																'ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/quotes', {
        controller: 'QuoteListCtrl',
				resolve: {
					quotes: ['MultiQuoteLoader', function(MultiQuoteLoader) {
						return new MultiQuoteLoader();
					}]
				},
        templateUrl: 'views/quoteList.html'

      }).when('/quotes/new', {
				controller: 'QuoteNewCtrl',
				templateUrl: 'views/quoteForm.html'

			}).when('/quotes/view/:seq', {
				controller: 'QuoteViewCtrl',
				resolve: {
					quote: ['QuoteLoader', function(QuoteLoader) {
						return new QuoteLoader();
					}]
				},
				templateUrl:'views/quoteView.html'

			}).when('/quotes/edit/:seq', {
				controller: 'QuoteEditCtrl',
				resolve: {
					quote: ['QuoteLoader', function(QuoteLoader) {
						return new QuoteLoader();
					}]
				},
				templateUrl:'views/quoteForm.html'

			}).when('/users', {
				controller: 'UserListCtrl',
				resolve: {
					users: ['MultiUserLoader', function(MultiUserLoader) {
						return new MultiUserLoader();
					}]
				},
				templateUrl: 'views/userList.html'

			}).when('/users/new', {
				controller: 'UserNewCtrl',
				templateUrl: 'views/userForm.html'

			}).when('/users/view/:userid', {
				controller: 'UserViewCtrl',
				resolve: {
					user: ['UserLoader', function(UserLoader) {
						return new UserLoader();
					}]
				},
				templateUrl: 'views/userView.html'

			}).when('/users/edit/:userid', {
				controller: 'UserEditCtrl',
				resolve: {
					user: ['UserLoader', function(UserLoader) {
						return new UserLoader(); 
					}]
				},
				templateUrl: 'views/userForm.html'
			
			}).otherwise({
        redirectTo: '/quotes'
      });
  }]);
