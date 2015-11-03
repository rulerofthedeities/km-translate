angular.module('km.translate', [])

.constant('version', '0.0.1')
.value("translateSettings", {
	lan: 'en'
})

.value('translateTable', {
    'Hello World': {'nl': 'Hallo Wereld'}
})

/*
.provider('kmt', function() {
	this.lan = "";

    this.setLanguage = function(newLan) {
        this.lan = newLan;
    };

    this.$get = function() {
        var lan = this.lan;
        return {
            getCurrentLanguage: function() {
                return lan;
            }
        };
    };

})
*/

.factory("kmt", function(translateSettings){
	return {
		getCurrentLanguage: function(){ 
			return translateSettings.lan;
		},
		setCurrentLanguage: function(newLan){
			translateSettings.lan = newLan;
			
		}
	};
})

.factory('doTranslation', function(kmt, translateTable){
	return {
		translate: function(strToTranslate){
			//console.log(translateTable[strToTranslate]);
			return translateTable[strToTranslate][kmt.getCurrentLanguage()];
		}
	};
})

.filter('translate', function(doTranslation){

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
			console.log("title" + scope.title);
			console.log(attributes[params[1]]);
			attributes[params[1]] = "test";
		}
	};
});