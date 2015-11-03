angular.module("translationDemo", ['km.translate'])

.controller("mainCtrl", function($scope, kmt){
	kmt.setCurrentLanguage('nl');
	$scope.data = {title:'Hello World', currentLanguage: kmt.getCurrentLanguage()};

})

.directive("flags", function(){
	return {
		require: 'E',
		templateUrl: 'partials/flags.htm',
		scope: {},
		controller: function($scope, kmt){
			//ISO 3166-1-alpha-2 code
			$scope.languages = [
				{code: 'en', name:'English'},
				{code: 'de', name:'Deutsch'}, 
				{code: 'fr', name:'Français'}, 
				{code: 'es', name:'Español'}, 
				{code: 'ru', name:'Ру́сский язы́к'}, 
				{code: 'nl', name:'Nederlands'},  
				{code: 'cs', name:'Čeština'}
				];
			$scope.setLanguage = function(newLan){
				console.log("change to " + newLan);
				kmt.setCurrentLanguage(newLan);
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
});