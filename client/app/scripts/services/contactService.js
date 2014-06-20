'use strict';

var services = angular.module('peakquoteApp.contactService', ['ngResource', 'ngRoute']);

services.factory('Contact', ['$resource',
    function($resource) {
  return $resource('/contacts/:contactid', {contactid: '@contactid'});
}]);

services.factory('ContactLoader', ['Contact', '$route', '$q',
    function(Contact, $route, $q) {
  return function() {
    var delay = $q.defer();
    Contact.get({contactid: $route.current.params.contactid}, function(contact) {
      delay.resolve(contact);
    }, function() {
      delay.reject('Unable to fetch contact '  + $route.current.params.contactid);
    });
    return delay.promise;
  };
}]);

services.factory('MultiContactLoader', ['Contact', '$q',
    function(Contact, $q) {
  return function() {
    var delay = $q.defer();
    Contact.query(function(contacts) {
      delay.resolve(contacts);
    }, function() {
      delay.reject('Unable to fetch contacts');
    });
    return delay.promise;
  };
}]);
