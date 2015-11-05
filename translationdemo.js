angular.module("translationDemo", ['ngRoute', 'km.translate'])

.config(function($routeProvider, $provide){
	console.log("config route");
	$routeProvider.when('/', {
		templateUrl:'partials/totranslate.htm'
	}).when('/:lan', {
		templateUrl:'partials/totranslate.htm',
		controller:'translateCtrl'
	}).otherwise({redirectTo: '/'});
})

.config(function(kmtProvider){
	kmtProvider.configSetCurrentLanguage("en");
})

.controller("translateCtrl", function($scope, kmt, $routeParams){
	kmt.setCurrentLanguage($routeParams.lan);
	$scope.data = {
		title:'Hello World!',
		currentLanguage: kmt.getCurrentLanguage()
	};
})

.directive("flags", function(){
	return {
		require: 'E',
		templateUrl: 'partials/flags.htm',
		scope: {},
		controller: function($scope, $location, kmt){
			//ISO 3166-1-alpha-2 code
			$scope.languages = [
				{code: 'en', name:'English'},
				{code: 'de', name:'Deutsch'}, 
				{code: 'fr', name:'Français'}, 
				{code: 'es', name:'Español'}, 
				{code: 'ru', name:'Ру́сский язы́к'}, 
				{code: 'nl', name:'Nederlands'},  
				{code: 'cz', name:'Čeština'}
				];
			$scope.setLanguage = function(newLan){
				var url = '/' + newLan;
				$location.url(url);
			};
		}
	};
})

.directive("test1", function(){
	return{
		require: 'E',
		scope : {header:"@title"},
		template: '<h1>{{header}}</h1>' 
	};
})

.directive("test2", function(){
	return{
		require: 'E',
		scope : {header:"@title"},
		template: '<h1>{{header | translate}}</h1>'
	};
})

.directive("test3", function(){
	return{
		require: 'E',
		scope : {header:"@title"},
		template: '<h1>{{header}}</h1>'
	};
});