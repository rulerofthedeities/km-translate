angular.module("translationDemo", ['km.translate'])

.config(function(kmtProvider){
	kmtProvider.configSetCurrentLanguage("ru");
})

.controller("mainCtrl", function($scope, kmt){
	$scope.data = {
		title:'Hello World!', 
		currentLanguage: kmt.getCurrentLanguage()
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