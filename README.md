# km-translate
Km-translate is a small translation module for AngularJS

##Installation
Download translate.js and load it in your html page:
```html
<script src="translate.js"></script>
```

##Implementation
1. Create a JSON file with a translation table. The default formatting is as follows:
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
2. Load the module

```javascript
angular.module('myApp', ['km.translate']);
```

3. Configure the initial language and the translation table:

```javascript
.config(['kmtpProvider', function(kmtpProvider){
	kmtpProvider.configSetCurrentLanguage("en");
	kmtpProvider.configSetTranslationFile("json/translations.json", "lan");
}])
```
