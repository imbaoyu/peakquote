'use strict';

describe('UserController', function() {
	var $scope, ctrl, mockBackend;

  beforeEach(module('peakquoteApp'));
  beforeEach(module('peakquoteApp.userController'));
  beforeEach(module('peakquoteApp.userService'));

	beforeEach(function() {
		this.addMatchers({
			toEqualData: function(expected) {
				return angular.equals(this.actual, expected);
			}
		});
	});

	describe('UserListCtrl', function () {

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			ctrl = $controller('UserListCtrl', {
				$scope: $scope,
				users: [{admin:true},{admin:false},{admin:false}]
			});
		}));

		it('should have list of users', function () {
			expect($scope.users).toEqual([{admin:true},{admin:false},{admin:false}]);
		});
	});

	describe('MultiUserLoader', function() {
		var loader;
		beforeEach(inject(function($httpBackend, MultiUserLoader) {
			mockBackend = $httpBackend;
			loader = MultiUserLoader;
		}));

		it('should load list of users', function() {
			mockBackend.expectGET('/users').respond([{admin:true},{admin:false},{admin:false}]);
			var users;
			var promise = loader();
			promise.then(function(rec) {
				users = rec;
			});
			expect(users).toBeUndefined();
			mockBackend.flush();
			expect(users).toEqualData([{admin:true},{admin:false},{admin:false}]);
		});
	});

});
