'use strict';

var services = angular.module('peakquoteApp.userService', ['ngResource', 'ngRoute']);

services.factory('User', ['$resource',
    function($resource) {
  return $resource('/users/:userid', {userid: '@userid'});
}]);

services.factory('UserLoader', ['User', '$route', '$q', 
		function(User, $route, $q) {
	return function() {
		var delay = $q.defer();
		User.get({userid:$route.current.params.userid}, function(user){
			delay.resolve(user);
		}, function(){
			delay.reject('Unable to fetch user ' + $route.current.params.userid)
		});
		return delay.promise;
	}
}]);

services.factory('MultiUserLoader', ['User', '$q',
    function(User, $q) {
  return function() {
    var delay = $q.defer();
    User.query(function(users) {
      delay.resolve(users);
    }, function() {
      delay.reject('Unable to fetch users');
    });
    return delay.promise;
  };
}]);

services.factory('CurrentUser', ['$http',
		function($http) {
	return function() {
		return $http({method: 'GET', url: '/self', cache: true}).
			then(function(res) {
				console.log("res.data " + res.data.user);
				return res.data.user;
			});
	};
}]);

