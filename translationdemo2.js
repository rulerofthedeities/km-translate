angular.module("translationDemo", ['ngRoute', 'km.translate'])

.config(['$routeProvider', 'kmTranslateConfigProvider', function($routeProvider, kmTranslateConfigProvider){

	$routeProvider.when('/', {
		templateUrl:'partials/totranslate.htm',
		controller:'translateCtrl'
	}).when('/:lan', {
		templateUrl:'partials/totranslate.htm',
		controller:'translateCtrl'
	}).otherwise({redirectTo: '/'});

	var json = {
"cz": {
	"Hello World!": "Ahoj světe!",
	"daysinweek": ["pondělí", "útery", "středa", "čtvrtek", "pátek", "sobota", "neděle"],
	"London":{
		"nom": "Londýn",
		"gen": "Londýna",
		"dat": "Londýnu",
		"acc": "Londýn",
		"voc": "Londýne",
		"loc": "Londýně",
		"ins": "Londýnem"
		},
	"Paris":{
		"nom": "Paříž",
		"gen": "Paříže",
		"dat": "Paříži",
		"acc": "Paříž",
		"voc": "Paříži",
		"loc": "Paříži",
		"ins": "Paříží"
		},
	"I live in %s": "Žiju v %s",
	"I live in %s and I'm going to %s": "Bydlím v %s a půjdu do %s",
	"I live in %i1 and I'm going to %i2": "Půjdu do %i2 a žiji v %i1"
},
"de": {
	"Hello World!": "Hallo Welt!",
	"daysinweek": ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
	"London": {
		"nom": "London",
		"gen": "Londons",
		"dat": "London",
		"acc": "London"
	},
	"Paris": "Paris",
	"I live in %s": "Ich lebe in %s",
	"I live in %s and I'm going to %s": "Ich lebe in %s und Ich gehe nach %s",
	"I live in %i1 and I'm going to %i2": "Ich gehe nach %i2 und lebe in %i1"
},
"en": {
	"daysinweek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
},
"es": {
	"Hello World!": "¡Hola, mundo!",
	"daysinweek": ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"],
	"London": "Londres",
	"Paris": "París",
	"I live in %s": "Yo vivo en %s",
	"I live in %s and I'm going to %s": "Yo vivo en %s y me voy a %s",
	"I live in %i1 and I'm going to %i2": "Yo me voy a %i2 y vivo en %i1"
},
"fr": {
	"Hello World!": "Bonjour le monde!",
	"daysinweek": ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
	"London": "Londres",
	"Paris": "Paris",
	"I live in %s": "J'habite à %s",
	"I live in %s and I'm going to %s": "J'habite à %s et je vais à %s",
	"I live in %i1 and I'm going to %i2": "Je vais à %i2 et j'habite à %i1"
},
"it": {
	"Hello World!": "Ciao, mondo!",
	"daysinweek": ["lunedì", "martedi", "mercoledì", "giovedì", "venerdì", "sabato", "domenica"],
	"London": "Londra",
	"Paris": "Parigi",
	"I live in %s": "Io vivo a %s",
	"I live in %s and I'm going to %s": "Io vivo a %s e io vado a %s",
	"I live in %i1 and I'm going to %i2": "Io vado a %i2 e io vivo a %i1"
},
"nl": {
	"Hello World!": "Hallo wereld!",
	"daysinweek": ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"],
	"London": "Londen",
	"Paris": "Parijs",
	"I live in %s": "Ik woon in %s",
	"I live in %s and I'm going to %s": "Ik woon in %s en ga naar %s",
	"I live in %i1 and I'm going to %i2": "Ik ga naar %i2 en woon in %i1"
},
"ru": {
	"Hello World!": "Привет, мир!",
	"daysinweek": ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"],
	"London": {
		"nom": "Ло́ндон",
		"gen": "Ло́ндона",
		"dat": "Ло́ндону",
		"acc": "Ло́ндон",
		"abl": "Ло́ндоном",
		"prep": "Ло́ндоне"
	},
	"Paris": {
		"nom": "Пари́ж",
		"gen": "Пари́жа",
		"dat": "Пари́жу",
		"acc": "Пари́ж",
		"abl": "Пари́жем",
		"prep": "Пари́же"
	},
	"I live in %s": "Я живу в %s",
	"I live in %s and I'm going to %s": "Я живу в %s и я иду в %s",
	"I live in %i1 and I'm going to %i2": "Я иду в %i2 и я живу в %i1"
	
}};

	kmTranslateConfigProvider.configSetCurrentLanguage("en");
	kmTranslateConfigProvider.configSetTranslationTable(json, "lan");
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
