'use strict';

/**
 * Main AngularJS Web Application
 */
var app = angular.module('bankApp', [
  'ngRoute',
  'ngTable'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "views/home.html", controller: "HomeCtrl"})
    // Pages
    .when("/transactions/:accountNumber", {templateUrl: "views/transactions.html", controller: "TransCtrl"})
    // 404
    .when("/404", {templateUrl: "views/404.html", controller: "NotFoundCtrl"})
    // else redirect to 404
    .otherwise({redirectTo:'/404'})
  //other settings
  //$locationProvider.html5Mode(false);
	$locationProvider.hashPrefix('');
}]);

app.controller('HomeCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  console.log("HomeCtrl started");
  
  $scope.searchAccount = function(){
  	console.log("searching accountNumber: "+$scope.accountNumber);

  	$http.get('/api-mock/balance/'+$scope.accountNumber).then(function(response){
  		console.log('found balance:', response.data);
  		$scope.balanceData = response.data;
  	});
  };

  $scope.goToTransactions = function(){
  	console.log("go to transactions for accountNumber: "+$scope.accountNumber);
  	$location.path('transactions/'+$scope.accountNumber);
  }

}]);

app.controller('TransCtrl', ['$scope', '$http', '$location', '$routeParams', 'NgTableParams', function ($scope, $http, $location, $routeParams, NgTableParams) {
  console.log("TransCtrl started");
  $scope.accountNumber = $routeParams.accountNumber;
  	console.log("searching transactions for accountNumber: "+$scope.accountNumber);

  	$http.get('/api-mock/transactions/'+$scope.accountNumber).then(function(response){
  		console.log('found transactions:', response.data);
  		$scope.tableParams = new NgTableParams({}, { dataset: response.data});
  	});

}]);

app.controller('NotFoundCtrl', function (/* $scope, $location, $http */) {
  console.log("NotFoundCtrl started");
});