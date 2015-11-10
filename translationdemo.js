angular.module("translationDemo", ['ngRoute', 'km.translate'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl:'partials/totranslate.htm',
		controller:'translateCtrl',
		resolve:{
			'translationData':['kmts', function(kmts){
				return kmts.promise;
			}]
		}
	}).when('/:lan', {
		templateUrl:'partials/totranslate.htm',
		controller:'translateCtrl',
		resolve:{
			'translationData':['kmts', function(kmts){
				return kmts.promise;
			}]
		}
	}).otherwise({redirectTo: '/'});
}])

.config(['kmtpProvider', function(kmtpProvider){
	kmtpProvider.configSetCurrentLanguage("en");
	kmtpProvider.configSetTranslationFile("json/translations.json", "lan");
}])

.controller("translateCtrl", ['$scope', 'kmtp', '$routeParams', function($scope, kmtp, $routeParams){
	kmtp.setCurrentLanguage($routeParams.lan);
	$scope.data = {
		title:'Hello World!',
		currentLanguage: kmtp.getCurrentLanguage()
	};
}])

.directive("flags", function(){
	return {
		require: 'E',
		templateUrl: 'partials/flags.htm',
		scope: {},
		controller: ['$scope', '$location', function($scope, $location){
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
		}]
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

.directive("test4", ['translate', function(translate){
	return{
		require: 'E',
		scope : {},
		template: '<h1>{{title}}</h1>',
		controller: ['$scope', function($scope){
			$scope.title = translate.translate("Hello World!");
		}]
	};
}])

.directive("test5", ['translate', function(translate){
	return{
		require: 'E',
		scope : {},
		template: '<ul class="list-inline"><li ng-repeat="day in days">{{day}}</li></ul>',
		controller: ['$scope', function($scope){
			$scope.days = translate.translate(null, {'alias':'daysinweek'});
		}]
	};
}])

.directive("test6", ['translate', function(translate){
	return{
		require: 'E',
		scope : {},
		template: '<div><em>Source (en):{{city}}</em><br>Nominative: {{cityNom}}<br>Accusative: {{cityAcc}}<br>Genitive: {{cityGen}}<br>Locative: {{cityLoc}}</div>',
		controller: ['$scope', function($scope){
			var city = "London",
				cityNom = translate.translate(city),
				cityAcc = translate.translate(city, {'case': 'acc'}),
				cityGen = translate.translate(city, {'case': 'gen'}),
				cityLoc = translate.translate(city, {'case': 'loc'});
			$scope.city = city;
			$scope.cityNom = cityNom;
			$scope.cityAcc = cityAcc;
			$scope.cityGen = cityGen;
			$scope.cityLoc = cityLoc;
		}]
	};
}])

.directive("test7", ['translate', function(translate){
	return{
		require: 'E',
		scope : {},
		template: '<div>{{whereilive}}<br>{{whereilive2}}<br><br><em>Multiple variables:</em><br>{{whereiliveandgo}}<br><em>With variable placing</em>:<br>{{whereiliveandgo2}}</div>',
		controller: ['$scope', function($scope){
			var cityLoc = translate.translate("London", {'case':"loc"});
			$scope.whereilive = translate.translate("I live in %s", {'insert':cityLoc});
			cityLoc = translate.translate("Paris", {'case':"loc"});
			$scope.whereilive2 = translate.translate("I live in %s", {'insert':cityLoc});
			$scope.whereiliveandgo = translate.translate("I live in %s and I'm going to %s",
				{'insert':["A", "B"]});
			$scope.whereiliveandgo2 = translate.translate("I live in %i1 and I'm going to %i2",
				{'insert':["A", "B"]});
		}]
	};
}]);