var VejrsgoApp = angular.module("VejrsgoApp", ['ngRoute', 'ngMaterial']);

VejrsgoApp.config(['$routeProvider', function($routeProvider) {

	$routeProvider
	.when("/", {
		templateUrl: "src/html/include/cards.html",
		controller: "cardCtrl"
	})
	.when("/settings", {
		templateUrl: "src/html/include/settings.html",
		controller: "settingsCtrl"
	})
	.when("/user", {
		templateUrl: "src/html/include/user.html",
		controller: "userCtrl"
	});

}])

.controller("cardCtrl", function($scope, $http, $q, getCardData) {

	Vejrsgo.title("Vejrsgo'");

	if (!$scope.cards) {
		$scope.cards = {};
	}

	console.log("cardCtrl-controller initated");

	$scope.initiated = "cardCtrl";

	console.log(Vejrsgo.storage.get("user"));

	Vejrsgo.load.show();

	getCardData().then(function(data) {
		console.log("cardData successfully loaded!");
		console.log(data)
		$scope.cards = data;
		Vejrsgo.load.hide();
	}, function(error) {
		console.log(error);
		Vejrsgo.load.hide();
	});




})

.factory("getCardData", function($q, $http) {
	return function() {
		var deferred = $q.defer();

		$http.get("http://192.168.0.10:8004").success(function(data) {
			deferred.resolve(data);
		}).error(function() {
			deferred.reject("Something went wrong on asynchronous call!");
		});

		return deferred.promise;

	};
})

.controller("settingsCtrl", function($scope, $http) {

	Vejrsgo.title("Vejrsgo' - Settings");

})


.controller("userCtrl", function($scope) {

	$scope.loggedin = false;

});
