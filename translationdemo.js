angular.module("translationDemo", ['ngRoute', 'km.translate'])

.config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl:'partials/totranslate.htm',
		controller:'translateCtrl',
		resolve:{
			'translationData':function(kmts){
				console.log("Loading file...");
				return kmts.promise;
			}
		}
	}).when('/:lan', {
		templateUrl:'partials/totranslate.htm',
		controller:'translateCtrl',
		resolve:{
			'translationData':function(kmts){
				console.log("Loading file...");
				return kmts.promise;
			}
		}
	}).otherwise({redirectTo: '/'});
})

.config(function(kmtpProvider){
	kmtpProvider.configSetCurrentLanguage("en");
	//kmtpProvider.configSetTranslationFile("json/translations.json");
})

.controller("translateCtrl", function($scope, kmtp, $routeParams){
	kmtp.setCurrentLanguage($routeParams.lan);
	$scope.data = {
		title:'Hello World!',
		currentLanguage: kmtp.getCurrentLanguage()
	};
})

.directive("flags", function(){
	return {
		require: 'E',
		templateUrl: 'partials/flags.htm',
		scope: {},
		controller: function($scope, $location){
			//ISO 3166-1-alpha-2 code
			$scope.languages = [
				{code: 'en', name:'English'},
				{code: 'de', name:'Deutsch'},
				{code: 'fr', name:'Français'},
				{code: 'es', name:'Español'},
				{code: 'ru', name:'Ру́сский язы́к'},
				{code: 'nl', name:'Nederlands'},
				{code: 'cz', name:'Čeština'},
				{code: 'it', name:'Italiano'}
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
})

.directive("test4", function(translate){
	return{
		require: 'E',
		scope : {},
		template: '<h1>{{title}}</h1>',
		controller: function($scope){
			$scope.title = translate.translate("Hello World!");
		}
	};
})

.directive("test5", function(translate){
	return{
		require: 'E',
		scope : {},
		template: '<ul class="list-inline"><li ng-repeat="day in days">{{day}}</li></ul>',
		controller: function($scope){
			$scope.days = translate.translate(null, {'alias':'daysinweek'});
		}
	};
})

.directive("test6", function(translate){
	return{
		require: 'E',
		scope : {},
		template: '<div>Source (en):{{city}}<br>Nominative: {{cityNom}}<br>Accusative: {{cityAcc}}<br>Locative: {{cityLoc}}</div>',
		controller: function($scope){
			var city = "London",
				cityNom = translate.translate(city),
				cityAcc = translate.translate(city, {'case': 'acc'}),
				cityLoc = translate.translate(city, {'case': 'loc'});
			$scope.city = city;
			$scope.cityNom = cityNom;
			$scope.cityAcc = cityAcc;
			$scope.cityLoc = cityLoc;
		}
	};
})

.directive("test7", function(translate){
	return{
		require: 'E',
		scope : {},
		template: '<div>{{whereilive}}<br>{{whereimgoingto}}<br>{{whereiliveandgo}}<br>{{whereiliveandgo2}}</div>',
		controller: function($scope){
			var cityLoc = translate.translate("London", {'case':"loc"}),
				cityAcc = translate.translate("Paris", {'case':"acc"});
			$scope.whereilive = translate.translate("I live in %s", {'insert':cityLoc});
			$scope.whereimgoingto = translate.translate("I'm going to %s", {'insert':cityAcc});
			$scope.whereiliveandgo = translate.translate("I live in %s and I'm going to %s",
				{'insert':["A", "B"]});
			$scope.whereiliveandgo2 = translate.translate("I live in %i1 and I'm going to %i2",
				{'insert':["A", "B"]});
		}
	};
});