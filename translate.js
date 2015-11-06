angular.module('km.translate', [])

.constant('DEFAULT_LAN', 'en')

.value('translateTable', {
	'Hello World!': {
		'cz': 'Ahoj světe!',
		'de': 'Hallo Welt!',
		'es': '¡Hola, mundo!',
		'fr': 'Bonjour le monde!',
		//'it': 'Ciao, mondo!',
		'nl': 'Hallo wereld!',
		'ru': 'Привет, мир!'
	},
	'daysinweek': {
		'cz': ["pondělí", "útery", "středa", "čtvrtek", "pátek", "sobota", "neděle"],
		'en': ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
		'nl': ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"]
	}
})

.provider('kmt', function(DEFAULT_LAN) {
	var lan = "";
 
	return {
		configSetCurrentLanguage: function(newLan) {
			lan = newLan;
		},

	    $get: function() {
	        return {
	            getCurrentLanguage: function() {
	                return lan;
	            },
	            setCurrentLanguage: function(newLan){
	            	lan = newLan || DEFAULT_LAN;
	            }
	        };
		}
	};

})

.factory('translate', function(kmt, translateTable){
	return {
		translate: function(strToTranslate, options){
			var lan = kmt.getCurrentLanguage();
			options = options || {};
			strToTranslate = options.alias || strToTranslate;
			
			if (translateTable && translateTable[strToTranslate] && translateTable[strToTranslate][lan]){
				return translateTable[strToTranslate][lan];
			} else {
				if (options.alias){
					return null;
				} else {
					return strToTranslate;
				}
			}
		}
	};
})

.filter('translate', function(translate){
	console.log("translate filter");
	return function(input){
		var translation = translate.translate(input);
		if (translation){
			return translation;
		} else {
			return input;
		}
	};
})

.directive('translate', function(translate, $compile){
	console.log("translate directive");
	return {
		compile: function(scope, element, attributes){
			return {
				pre: function preLink(scope, iElement, iAttrs, controller) {
				},
				post: function postLink(scope, iElement, iAttrs, controller) {

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

					var params = iAttrs.translate.split("|"),
						input = iAttrs[params[1]];

					if (input){
						iAttrs.$set(params[1], translate.translate(input));
						iAttrs.$set("translate", ""); //To prevent looping

						$compile(iElement)(scope);
					}
				}
			};
		}

	};
});
