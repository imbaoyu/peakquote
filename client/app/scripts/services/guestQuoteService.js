'use strict';

var app = angular.module('guestQuoteApp', ['ngResource', 'ngRoute']);

app.factory('GuestQuote', ['$resource',
			function($resource) {
		return $resource('guestquotes/:quoteid', {quoteid: '@quoteid'});			
}]);

app.factory('GuestQuoteLoader', ['GuestQuote', '$route', '$q',
    function(GuestQuote, $route, $q) {
  return function(id) {
    var delay = $q.defer();
    Quote.get({quoteid: id}, function(quote) {
      delay.resolve(quote);
    }, function() {
      delay.reject('Unable to fetch quote '  + $route.current.params.quoteId);
    });
    return delay.promise;
  };
}]);
