angular.module("translationDemo", ['ngRoute', 'km.translate'])

.config(['$routeProvider', 'kmTranslateConfigProvider', function($routeProvider, kmTranslateConfigProvider){
	var translationResolve = ['kmTranslateFile',
  		function(kmTranslateFile){
			return kmTranslateFile.promise();
	}];


	$routeProvider.when('/', {
		templateUrl:'partials/totranslate.htm',
		controller:'translateCtrl',
		resolve:{
			'translationData':translationResolve
		}
	}).when('/:lan', {
		templateUrl:'partials/totranslate.htm',
		controller:'translateCtrl',
		resolve:{
			'translationData':translationResolve
		}
	}).otherwise({redirectTo: '/'});

	kmTranslateConfigProvider.configSetCurrentLanguage("en");
	kmTranslateConfigProvider.configSetTranslationFile("json/translations.json", "lan");
}])

.controller("translateCtrl", ['$scope', 'kmTranslateConfig', '$routeParams', function($scope, kmTranslateConfig, $routeParams){
	kmTranslateConfig.setCurrentLanguage($routeParams.lan);
	$scope.data = {
		title:'Hello World!',
		currentLanguage: kmTranslateConfig.getCurrentLanguage()
	};
}])

.directive("flags", function(){
	return {
		restrict: 'E',
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
		restrict: 'E',
		scope : {header:"@title"},
		template: '<h1>{{header}}</h1>'
	};
})

.directive("test2", function(){
	return{
		restrict: 'E',
		scope : {header:"@title"},
		template: '<h1>{{header | translate}}</h1>'
	};
})

.directive("test3", function(){
	return{
		restrict: 'E',
		scope : {header:"@title"},
		template: '<h1>{{header}}</h1>'
	};
})

.directive("test4", function(){
	return{};
})

.directive("test5", ['kmTranslate', function(kmTranslate){
	return{
		restrict: 'E',
		scope : {},
		template: '<h1>{{title}}</h1>',
		controller: ['$scope', function($scope){
			$scope.title = kmTranslate.translate("Hello World!");
		}]
	};
}])

.directive("test6", ['kmTranslate', function(kmTranslate){
	return{
		restrict: 'E',
		scope : {},
		template: '<ul class="list-inline"><li ng-repeat="day in days">{{day}}</li></ul>',
		controller: ['$scope', function($scope){
			$scope.days = kmTranslate.translate(null, {'alias':'daysinweek'});
		}]
	};
}])

.directive("test7", ['kmTranslate', function(kmTranslate){
	return{
		restrict: 'E',
		scope : {},
		template: '<div><em>Source (en):{{city}}</em><br>Nominative: {{cityNom}}<br>Accusative: {{cityAcc}}<br>Genitive: {{cityGen}}<br>Locative: {{cityLoc}}</div>',
		controller: ['$scope', function($scope){
			var city = "London",
				cityNom = kmTranslate.translate(city),
				cityAcc = kmTranslate.translate(city, {'case': 'acc'}),
				cityGen = kmTranslate.translate(city, {'case': 'gen'}),
				cityLoc = kmTranslate.translate(city, {'case': 'loc'});
			$scope.city = city;
			$scope.cityNom = cityNom;
			$scope.cityAcc = cityAcc;
			$scope.cityGen = cityGen;
			$scope.cityLoc = cityLoc;
		}]
	};
}])

.directive("test8", ['kmTranslate', function(kmTranslate){
	return{
		restrict: 'E',
		scope : {},
		template: '<div>{{whereilive}}<br>{{whereilive2}}<br><br><em>Multiple variables:</em><br>{{whereiliveandgo}}<br><em>With variable placing</em>:<br>{{whereiliveandgo2}}</div>',
		controller: ['$scope', function($scope){
			var cityLoc = kmTranslate.translate("London", {'case':"loc"});
			$scope.whereilive = kmTranslate.translate("I live in %s", {'insert':cityLoc});
			cityLoc = kmTranslate.translate("Paris", {'case':"loc"});
			$scope.whereilive2 = kmTranslate.translate("I live in %s", {'insert':cityLoc});
			$scope.whereiliveandgo = kmTranslate.translate("I live in %s and I'm going to %s",
				{'insert':["A", "B"]});
			$scope.whereiliveandgo2 = kmTranslate.translate("I live in %i1 and I'm going to %i2",
				{'insert':["A", "B"]});
		}]
	};
}]);
