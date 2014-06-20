'use strict';

describe('quoteController', function() {
	var $scope, ctrl, mockBackend;

  beforeEach(module('peakquoteApp'));
  beforeEach(module('peakquoteApp.quoteController'));
  beforeEach(module('peakquoteApp.quoteService'));

	beforeEach(function() {
		this.addMatchers({
			toEqualData: function(expected) {
				return angular.equals(this.actual, expected);
			}
		});
	});

	describe('QuoteListCtrl', function () {

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			ctrl = $controller('QuoteListCtrl', {
				$scope: $scope,
				quotes: [1,2,3]
			});
		}));

		it('should have list of quotes', function () {
			expect($scope.quotes).toEqual([1,2,3]);
		});
	});

	describe('MultiQuoteLoader', function() {
		var loader;
		beforeEach(inject(function($httpBackend, MultiQuoteLoader) {
			mockBackend = $httpBackend;
			loader = MultiQuoteLoader;
		}));

		it('should load list of quotes', function() {
			mockBackend.expectGET('/quotes').respond([{seq: 1}, {seq: 2}]);
			var quotes;
			var promise = loader();
			promise.then(function(rec) {
				quotes = rec;
			});
			expect(quotes).toBeUndefined();
			mockBackend.flush();
			expect(quotes).toEqualData([{seq: 1}, {seq: 2}]);
		});
	});

	describe('QuoteLoader', function() {
		var loader, $location;
		beforeEach(inject(function($httpBackend, $templateCache, _$location_, QuoteLoader, $rootScope) {
				mockBackend = $httpBackend;
			  $templateCache.put('views/quoteView.html', '<html>quote view</html>');
				$location = _$location_;
				$scope = $rootScope.$new();
				loader = QuoteLoader;
			}));

		it('should load a Quote which is on the current path', function() {
			mockBackend.expectGET('/quotes/3').respond({seq: 3});
		  $location.path('/quotes/view/3');
			$scope.$apply();
			mockBackend.expectGET('/quotes/3').respond({seq: 3});
			var quotes;
			var promise = loader();
			promise.then(function(rec) {
				quotes = rec;
			});
			expect(quotes).toBeUndefined();
			mockBackend.flush();
		  expect(quotes).toEqualData({seq:3});
		});
	});



});
