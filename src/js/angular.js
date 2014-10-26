var VejrsgoApp = angular.module("VejrsgoApp", ['ngRoute']);

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

}])

.controller("cardCtrl", function($scope, $http, $q, getCardData) {

	Vejrsgo.title("Vejrsgo'");

	console.log("cardCtrl-controller initated");

	$scope.initiated = "cardCtrl";

	console.log(Vejrsgo.storage.get("user"));

	$q.when(getCardData()).then(function(data) {
		console.log("getCards resolved!", data);
	});

})

.controller("settingsCtrl", function($scope, $http) {

	Vejrsgo.title("Vejrsgo' - Settings");

})


.factory("getCardData", function($q, $http) {
	return function() {
		var deferred = $q.defer();

		$http.get("http://0.0.0.0:8004").success(function(data, status) {
			deferred.resolve(data);
		}).error(function() {
			deferred.reject("Something went wrong!");
		});

		return deferred.promise;

	};
});