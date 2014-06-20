'use strict';

//var app = angular.module('peakquoteApp.userController',['peakquoteApp.userService']);
var app = angular.module('peakquoteApp.userController',[]);

app.controller('UserListCtrl', ['$scope', 'users',
	function ($scope, users) {
			$scope.users = users;
}]);

app.controller('UserNewCtrl', ['$scope', '$location', 'User',
	function($scope, $location, User) {
		$scope.user = new User({admin:false});
		$scope.save = function() {
			$scope.user.$save(function() {
				$location.path('/users');
			});
		};
	}
]);

app.controller('UserViewCtrl', ['$scope', '$location', 'user',
	function($scope, $location, user) {
		$scope.user = user;
		$scope.edit = function() {
			$location.path('/users/edit/' + user.userid);
		};
}]);

app.controller('UserEditCtrl', ['$scope', '$location', 'user',
	function($scope, $location, user) {
		$scope.user = user;
		$scope.save = function() {
			$scope.user.$save(function(user) {
				$location.path('/users/view/' + user.userid);
			})
		}
		$scope.remove = function() {
			delete $scope.user;
			$location.path('/users');
		}
	}	
]);

app.controller('CurrentUserCtrl', ['$scope', 'CurrentUser', 
	function($scope, CurrentUser) {
		CurrentUser().then(function(user) {
			$scope.myself = user.email;
			$scope.isadmin = user.admin;
			console.log("myself is " + JSON.stringify($scope.myself));
		});
	}
]);
