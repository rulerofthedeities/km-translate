angular.module('km.translate', [])

.constant(
	'DEFAULTS', {
		'LAN': 'en', 
		'CASE': 'nom', 
		'FILE' : 'json/translations.json'}
)

.service('kmts', function ($http, $log, kmtp){
	var translationTable,
		promise,
		fileName;
	console.log("lan in http service: " + kmtp.getCurrentLanguage());
	fileName = kmtp.getTranslationFile();
	promise = $http.get(fileName);

	return {
		promise: promise.then(
			function (response) {
				$log.info("Fetched translation data from '" + fileName + "'");
				translationTable = response.data;
			},
			function(response){
				$log.error("File '" + fileName + "' not found.");
			}
		),
		getTranslationTable: function () {
			return translationTable;
		}
	};
})

.provider('kmtp', function(DEFAULTS) {
	var lan = DEFAULTS.LAN,
		translationFile = DEFAULTS.FILE;

	return {
		configSetCurrentLanguage: function(newLan) {
			lan = newLan;
		},
		configSetTranslationFile: function(newFileName){
			translationFile = newFileName;
		},

	    $get: function() {
	        return {
	            getCurrentLanguage: function() {
	                return lan;
	            },
	            setCurrentLanguage: function(newLan){
	            	lan = newLan || lan || DEFAULTS.LAN;
	            },
				insert: function(srcStr, toInsert){
					var resultStr = srcStr;
					if (toInsert.constructor === Array){
						for (var i = 0, find; i < toInsert.length; i++){
							find = new RegExp('\%i' + (i + 1));
							resultStr = resultStr.replace(find, toInsert[i]);
						}
						for (i = 0; i < toInsert.length; i++){
							resultStr = resultStr.replace(/\%s/, toInsert[i]);
						}
					} else {
						resultStr = srcStr.replace(/\%s/g, toInsert);
					}
					return resultStr;
				},
				getTranslationFile: function(fileName){
					return fileName || translationFile || DEFAULTS.FILE;
				},
				loadTranslationFile: function($http, fileName){
					var dataFile = fileName || translationFile || DEFAULTS.FILE,
						promise = $http.get(dataFile);

					//test delay
					console.log("start delay");
					//setTimeout(function(){ 
						console.log("end delay");
						promise.then(
						function(response) {
							console.log("Fetched translation data from '" + dataFile + "'");
							translateTable = response.data;
						},
						function(response) {
							console.log("File '" + dataFile + "' not found.");
						}
					);
					//}, 10);
					
				},
				getTranslationTable: function(){
					return translationTable;
				}
	        };
		}
	};

})

.factory('translate', function(DEFAULTS, kmtp, kmts){
	return {
		translate: function(strToTranslate, options){
			console.log("translating");
			var lan = kmtp.getCurrentLanguage(),
				translation = strToTranslate,
				cas,
				translateTable = kmts.getTranslationTable();
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
				translation = kmtp.insert(translation, options.insert);
				return translation;
			} else {
				return translation;
			}
		}
	};
})

.filter('translate', function(translate){
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
	return {
		compile: function(scope, element, attributes){
			return {
				pre: function preLink(scope, iElement, iAttrs, controller) {
				},
				post: function postLink(scope, iElement, iAttrs, controller) {
					var params = iAttrs.translate,
						attrToTranslate,
						toTranslate;

					if (params){
						input = JSON.parse(params.replace(/\'/g, '"'));
						attrToTranslate = input.attr;
						toTranslate = iAttrs[attrToTranslate];
						iAttrs.$set(attrToTranslate, translate.translate(toTranslate));
						iAttrs.$set("translate", ""); //To prevent looping

						$compile(iElement)(scope);
					}
				}
			};
		}

	};
});