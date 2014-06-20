'use strict';

var app = angular.module('guestQuoteApp',['ngResource', 'ngRoute']);

app.factory('GuestQuote', ['$resource',
			function($resource) {
		return $resource('guestquotes/:quoteid', {quoteid: '@quoteid'});			
}]).factory('GuestQuoteLoader', ['GuestQuote', '$route', '$q',
    function(GuestQuote, $route, $q) {
  return function(id) {
    var delay = $q.defer();
    GuestQuote.get({quoteid: id}, function(quote) {
			console.log("guest quote id returned " + JSON.stringify(quote));
      delay.resolve(quote);
    }, function() {
      delay.reject('Unable to fetch quote '  + $route.current.params.quoteId);
    });
    return delay.promise;
  };
}]).controller('GuestQuoteCtrl', ['$scope', 'GuestQuoteLoader',
	function($scope, GuestQuoteLoader) {
		$scope.showresult = false;
		$scope.search = function(quoteid) {
			console.log("search for " + quoteid);
			$scope.quoteid = quoteid;
			GuestQuoteLoader(quoteid).then(function(data){
				$scope.guestquote = data;
				$scope.showresult = !$scope.showresult;
			}); 
		}
	}
]);
