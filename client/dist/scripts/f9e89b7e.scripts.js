"use strict";var services=angular.module("peakquoteApp.quoteService",["ngResource","ngRoute"]);services.factory("Quote",["$resource",function(a){return a("/quotes/:id",{id:"@id"})}]),services.factory("MultiQuoteLoader",["Quote","$q",function(a,b){return function(){var c=b.defer();return a.query(function(a){c.resolve(a)},function(){c.reject("Unable to fetch quotes")}),c.promise}}]),services.factory("QuoteLoader",["Quote","$route","$q",function(a,b,c){return function(){var d=c.defer();return a.get({id:b.current.params.Id},function(a){d.resolve(a)},function(){d.reject("Unable to fetch quote "+b.current.params.Id)}),d.promise}}]);var services=angular.module("peakquoteApp.userService",["ngResource","ngRoute"]);services.factory("User",["$resource",function(a){return a("/users/:id",{id:"@id"})}]),services.factory("MultiUserLoader",["User","$q",function(a,b){return function(){var c=b.defer();return a.query(function(a){c.resolve(a)},function(){c.reject("Unable to fetch users")}),c.promise}}]);var app=angular.module("peakquoteApp.quoteController",[]);app.controller("QuoteListCtrl",["$scope","quotes",function(a,b){a.quotes=b}]),app.controller("QuoteViewCtrl",["$scope","$location","quote",function(a,b,c){a.quote=c,a.edit=function(){b.path("/quotes/edit/"+c.id)}}]),app.controller("QuoteEditCtrl",["$scope","$location","quote",function(a,b,c){a.quote=c,a.save=function(){a.quote.$save(function(a){b.path("/quotes/view/"+a.id)})},a.remove=function(){delete a.quotes,b.path("/")}}]),app.controller("QuoteNewCtrl",["$scope","$location","Quote",function(a,b,c){a.quote=new c({}),a.save=function(){a.quote.$save(function(a){b.path("/quotes/view/"+a.id)})}}]);var app=angular.module("peakquoteApp.userController",[]);app.controller("UserListCtrl",["$scope","users",function(a,b){a.users=b}]),app.controller("UserNewCtrl",["$scope","$location","User",function(a,b,c){a.user=new c({admin:!1}),a.save=function(){a.user.$save(function(){b.path("/users/list")})}}]),angular.module("peakquoteApp",["peakquoteApp.quoteController","peakquoteApp.quoteService","peakquoteApp.userController","peakquoteApp.userService","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{controller:"QuoteListCtrl",resolve:{quotes:["MultiQuoteLoader",function(a){return new a}]},templateUrl:"views/quoteList.html"}).when("/quotes/view/:Id",{controller:"QuoteViewCtrl",resolve:{quote:["QuoteLoader",function(a){return new a}]},templateUrl:"views/quoteView.html"}).when("/quotes/edit/:Id",{controller:"QuoteEditCtrl",resolve:{quote:["QuoteLoader",function(a){return new a}]},templateUrl:"views/quoteForm.html"}).when("/quotes/new",{controller:"QuoteNewCtrl",templateUrl:"views/quoteForm.html"}).when("/users/new",{controller:"UserNewCtrl",templateUrl:"views/userForm.html"}).when("/users/list",{controller:"UserListCtrl",resolve:{users:["MultiUserLoader",function(a){return new a}]},templateUrl:"views/userList.html"}).otherwise({redirectTo:"/"})}]);