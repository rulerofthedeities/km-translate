angular.module('km.translate', [])

.constant('version', '0.0.1')

.value('translateTable', {
    'Hello World!': {
    	'cz': 'Ahoj světe!',
    	'de': 'Hallo Welt!',
    	'es': '¡Hola, mundo!',
    	'fr': 'Bonjour le monde!',
    	'it': 'Ciao, mondo!',
    	'nl': 'Hallo wereld!',
    	'ru': 'Привет, мир!'
    }
})

/*
.service('kmt', function(){
	this.lan = "en";

	this.getCurrentLanguage = function() {
		return this.lan;
	};
	this.setCurrentLanguage = function(newLan){
		this.lan = newLan;
	};
})
*/

.provider('kmt', function() {
	var lan = "";

	return {
    	configGetCurrentLanguage: function() {
        	return lan;
    	},
    	configSetCurrentLanguage: function(newLan) {
			lan = newLan;
    	},

	    $get: function() {
	        return {
	            getCurrentLanguage: function() {
	                return lan;
	            },
	            setCurrentLanguage: function(newLan){
	            	lan = newLan;
	            }
	        };
		}
	};

})

.factory('doTranslation', function(kmt, translateTable){
	return {
		translate: function(strToTranslate){
			console.log("translating");
			return translateTable[strToTranslate][kmt.getCurrentLanguage()];
		}
	};
})

.filter('translate', function(doTranslation){
	console.log("translate filter");
	return function(input){
		var translation = doTranslation.translate(input);
		if (translation){
			return translation;
		} else {
			return input;
		}
	};
})

.directive('translate', function(){
	console.log("translate directive");
	return {
		link: function(scope, element, attributes, controller){
			console.log(attributes);
			console.log(attributes.translate);
			var params = attributes.translate.split("|"); 
			console.log(params);
			/*
				The first parameter is type of data to translate: 
					A : attribute
					C : content
					S : scope value
				The second parameter defines which value to translate:
					if fist parameter is 
					A : second parameter is the attribute name
					C : second parameter is the translation variable used to find the translation (in A & S this is the value)
					S : second parameter is the scope variable name
				The third parameter is optional. 
					It specifies a replacement value, to replace any %s in the text to translate, if available
				The fourth parameter is optional.
					It defines the case if one is required.
			*/
			console.log(attributes[params[1]]);
			attributes[params[1]] = "test";
			attributes.title = "test2";

		}
	};
});
