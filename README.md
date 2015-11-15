# km-translate
Km-translate is a small translation module for AngularJS applications

##Installation
Download the translate.js file and load it in your html page:
```html
<script src="translate.js"></script>
```

##Implementation
1. Create a JSON file or an object with a translation table. The default formatting is as follows:
```json
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
		}
}
```
note: the names of the cases and the number of cases can be different. If there are no cases, they can be omitted:
```json
"fr": {
	"London":"Londres"
}
```
2. Load the module
```javascript
angular.module('myApp', ['km.translate']);
```
3. Configure the initial language and the translation table:

a/ If you use a translation file: (see translationdemoFile.js)
```javascript
.config(['kmTranslateConfigProvider', function(kmTranslateConfigProvider){
	kmTranslateConfigProvider.configSetCurrentLanguage("en");
	kmTranslateConfigProvider.configSetTranslationFile("json/translations.json", "lan");
}])
```
b/ if you use a translation object: (see translationdemoObject.js)
```javascript
.config(['kmTranslateConfigProvider', function(kmTranslateConfigProvider){
	kmTranslateConfigProvider.configSetCurrentLanguage("en");
	kmTranslateConfigProvider.configSetTranslationTable(json, "lan");
}])
```
Note: the second parameter of the configSetTranslationFile and configSetTranslationTable functions specify the format of the translation table. 'lan' means the first index specifies the language code, while 'term' indicates that the translation table is organized by the term to be translated, followed by the language. (see the file 'json/translationsTerms.json' for an example)

##Usage
In the partials/totranslate.htm file you can see some examples that show how to use the translation module

1. Filters
In an expression in the source html:
```html
<test1 title="{{data.title | translate}}"></test1>
```
Or in an expression in the template html:
```javascript
.directive("test2", function(){
	return{
		restrict: 'E',
		scope : {header:"@title"},
		template: '<h1>{{header | translate}}</h1>'
	};
})
Note : too many filters can become a drain on performance
```
2. Directive attribute
Add a translate attribute with an object that indicates which attribute to translate (in this case the 'title' attribute)
```html
<test3 title="{{data.title}}" translate="{'attr':'title'}"></test3>
```
Add a translate attribute with the value 'content', this indicates the entire content of the directive element must be translated.
```html
<test4 translate="content">Hello World!</test4>
```
3. Controller

Translate a variable and assign it to the scope:
```javascript
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
```
Optionally, specify a case:
```javascript
$scope.where = kmTranslate.translate("in") + kmTranslate.translate("London", {'case': 'loc'});
```
You can also translate arrays by specifying an alias that points to the translated array in the translation table:
```javascript
$scope.days = kmTranslate.translate(null, {'alias':'daysinweek'});
```
Use %s with the 'insert' option if you want to insert a variable into a string:
```javascript
$scope.whereilive = kmTranslate.translate("I live in %s", {'insert':city});
```
You can insert multiple variables into one string by passing an array:
```javascript
$scope.whereilive = kmTranslate.translate("I live in %s and I'm going to %s", {'insert':["A", "B"]});
```
If you want to be able to change the position of the inserted variables, use %i<number> instead:
```javascript
$scope.whereilive = kmTranslate.translate("I live in %i1 and I'm going to %i2", {'insert':["A", "B"]});
```
This way, the translated sentence can use a different word order:
```json
"nl": {"I live in %i1 and I'm going to %i2": "Ik ga naar %i2 en woon in %i1"}
```
