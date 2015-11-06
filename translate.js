angular.module('km.translate', [])

.constant('DEFAULTS', {'LAN': 'en', 'CASE': 'nom'})

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
		'de': ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
		'en': ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
		'es': ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"],
		'fr': ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
		//'it': ["lunedì", "martedi", "mercoledì", "giovedì", "venerdì", "sabato", "domenica"],
		'nl': ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"],
		'ru': ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"]
	},
	'London':{
		'fr': 'Londres',
		'nl': 'Londen',
		'ru' : {
			'nom' : "Лондон",
			'acc' : "Лондона",
			'loc' : "Лондоне"
		}
	},
	'Paris':{
		'fr': 'Paris',
		'nl': 'Parijs'
	},
	'I live in %s':{
		'fr': 'J\'habite à %s',
		'nl': 'Ik woon in %s'
	},
	'I\'m going to %s':{
		'nl': 'Ik ga naar %s'
	},
	'I live in %s and I\'m going to %s':{
		'nl': 'Ik woon in %s en ga naar %s'
	},
	'I live in %i1 and I\'m going to %i2':{
		'nl': 'Ik ga naar %i2 en woon in %i1'
	}
})

.provider('kmt', function(DEFAULTS) {
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
	            	lan = newLan || DEFAULTS.LAN;
	            },
				insert: function(srcStr, toInsert){
					var resultStr = srcStr,
						find;
					if (toInsert.constructor === Array){
						for (var i = 0; i < toInsert.length; i++){
							find = new RegExp('\%i' + (i + 1));
							resultStr = resultStr.replace(find, toInsert[i]);
						}
						for (var i = 0; i < toInsert.length; i++){
							resultStr = resultStr.replace(/\%s/, toInsert[i]);
						}
					} else {
						resultStr = srcStr.replace(/\%s/g, toInsert);
					}
					return resultStr;
				}
	        };
		}
	};

})

.factory('translate', function(DEFAULTS, kmt, translateTable){
	return {
		translate: function(strToTranslate, options){
			var lan = kmt.getCurrentLanguage(),
				translation = strToTranslate,
				cas;
			options = options || {};
			strToTranslate = options.alias || strToTranslate;
			cas = options['case'];
			if (translateTable && translateTable[strToTranslate] && translateTable[strToTranslate][lan]){
				if (cas && translateTable[strToTranslate][lan][cas]){
					//Case is requested and found
					translation = translateTable[strToTranslate][lan][cas];
				} else {
					//Case is not requested but found, so fetch default case (nominative)
					if (translateTable[strToTranslate][lan][DEFAULTS.CASE]){
						translation = translateTable[strToTranslate][lan][DEFAULTS.CASE];
					} else {
						translation = translateTable[strToTranslate][lan];
					}
				}
			} else {
				// No translation found, return null if an alias was given
				if (options.alias){
					translation = null;
				}
			}
			//Check if there are strings to be inserted
			if ((/\%s/.test(translation) ||  (/\%i\d/.test(translation))) && options.insert){
				translation = kmt.insert(translation, options.insert);
				return translation;
			} else {
				return translation;
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
