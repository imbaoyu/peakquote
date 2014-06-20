'use strict';

var app = angular.module('peakquoteApp.quoteController',[]);

app.controller('QuoteListCtrl', ['$scope', 'quotes', 'CurrentUser',
	function ($scope, quotes, CurrentUser) {
			CurrentUser().then(function(user) {
				$scope.quotes = quotes;
				$scope.isadmin = user.admin;
			});
}]);

app.controller('QuoteNewCtrl', ['$scope', '$location', 'Quote',
	function($scope, $location, Quote) {
		$scope.quote = new Quote({});
		$scope.save = function() {
			$scope.quote.$save(function(quote) {
				console.log('returned seq is ' + quote.seq);
				$location.path('/quotes/view/' + quote.seq);
			});
		};
	}
]);

app.controller('QuoteViewCtrl', ['$scope', '$location', 'quote',
	function($scope, $location, quote) {
		$scope.quote = quote;
		$scope.edit = function() {
			$location.path('/quotes/edit/' + quote.seq);
		};
}]);

app.controller('QuoteEditCtrl', ['$scope', '$location', 'quote',
	function($scope, $location, quote) {
		$scope.quote = quote;
		$scope.save = function() {
			$scope.quote.$save(function(quote) {
				$location.path('/quotes/view/' + quote.seq);
			});
		};
		$scope.remove = function() {
			delete $scope.quote;
			$location.path('/');
		};
	}
]);
