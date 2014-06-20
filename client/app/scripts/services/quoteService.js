'use strict';

var services = angular.module('peakquoteApp.quoteService', ['ngResource', 'ngRoute']);

services.factory('Quote', ['$resource',
    function($resource) {
  return $resource('/quotes/:seq', {seq: '@seq'});
}]);

services.factory('QuoteLoader', ['Quote', '$route', '$q',
    function(Quote, $route, $q) {
  return function() {
    var delay = $q.defer();
    Quote.get({seq: $route.current.params.seq}, function(quote) {
      delay.resolve(quote);
    }, function() {
      delay.reject('Unable to fetch quote '  + $route.current.params.seq);
    });
    return delay.promise;
  };
}]);

services.factory('MultiQuoteLoader', ['Quote', '$q',
    function(Quote, $q) {
  return function() {
    var delay = $q.defer();
    Quote.query(function(quotes) {
      delay.resolve(quotes);
    }, function() {
      delay.reject('Unable to fetch quotes');
    });
    return delay.promise;
  };
}]);
