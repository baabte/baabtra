angular.module('baabtra').directive('randomBackgroundColor',['$compile', function($compile) {
	return {
		restrict: 'AC',
		link: function(scope, element, attrs, fn) {
			
			var colors = ["red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange"];


			var colorsArray = {

				"red":["btn-material-red","btn-material-red-400","btn-material-red-500","btn-material-red-600","btn-material-red-700","btn-material-red-800","btn-material-red-900","btn-material-red-A100","btn-material-red-A200","btn-material-red-A400","btn-material-red-A700"],

				"pink":["btn-material-pink","btn-material-pink-400","btn-material-pink-500","btn-material-pink-600","btn-material-pink-700","btn-material-pink-800","btn-material-pink-900","btn-material-pink-A100","btn-material-pink-A200","btn-material-pink-A400","btn-material-pink-A700"],

				"purple":["btn-material-purple","btn-material-purple-400","btn-material-purple-500","btn-material-purple-600","btn-material-purple-700","btn-material-purple-800","btn-material-purple-900","btn-material-purple-A100","btn-material-purple-A200","btn-material-purple-A400","btn-material-purple-A700"],

				"deep-purple":["btn-material-deep-purple","btn-material-deep-purple-400","btn-material-deep-purple-500","btn-material-deep-purple-600","btn-material-deep-purple-700","btn-material-deep-purple-800","btn-material-deep-purple-900","btn-material-deep-purple-A100","btn-material-deep-purple-A200","btn-material-deep-purple-A400","btn-material-deep-purple-A700"],

				"indigo":["btn-material-indigo","btn-material-indigo-400","btn-material-indigo-500","btn-material-indigo-600","btn-material-indigo-700","btn-material-indigo-800","btn-material-indigo-900","btn-material-indigo-A100","btn-material-indigo-A200","btn-material-indigo-A400","btn-material-indigo-A700"],

				"blue":["btn-material-blue","btn-material-blue-400","btn-material-blue-500","btn-material-blue-600","btn-material-blue-700","btn-material-blue-800","btn-material-blue-900","btn-material-blue-A100","btn-material-blue-A200","btn-material-blue-A400","btn-material-blue-A700"],

				"light-blue":["btn-material-light-blue","btn-material-light-blue-400","btn-material-light-blue-500","btn-material-light-blue-600","btn-material-light-blue-700","btn-material-light-blue-800","btn-material-light-blue-900","btn-material-light-blue-A100","btn-material-light-blue-A200","btn-material-light-blue-A400","btn-material-light-blue-A700"],

				"cyan":["btn-material-cyan","btn-material-cyan-400","btn-material-cyan-500","btn-material-cyan-600","btn-material-cyan-700","btn-material-cyan-800","btn-material-cyan-900","btn-material-cyan-A100","btn-material-cyan-A200","btn-material-cyan-A400","btn-material-cyan-A700"],

				"teal":["btn-material-teal","btn-material-teal-400","btn-material-teal-500","btn-material-teal-600","btn-material-teal-700","btn-material-teal-800","btn-material-teal-900","btn-material-teal-A100","btn-material-teal-A200","btn-material-teal-A400","btn-material-teal-A700"],

				"green":["btn-material-green","btn-material-green-400","btn-material-green-500","btn-material-green-600","btn-material-green-700","btn-material-green-800","btn-material-green-900","btn-material-green-A200","btn-material-green-A400","btn-material-green-A700"],

				"light-green":["btn-material-light-green","btn-material-light-green-400","btn-material-light-green-500","btn-material-light-green-600","btn-material-light-green-700","btn-material-light-green-800","btn-material-light-green-900","btn-material-light-green-A100","btn-material-light-green-A200","btn-material-light-green-A400","btn-material-light-green-A700"],

				"lime":["btn-material-lime","btn-material-lime-400","btn-material-lime-500","btn-material-lime-600","btn-material-lime-700","btn-material-lime-800","btn-material-lime-900","btn-material-lime-A100","btn-material-lime-A200","btn-material-lime-A400","btn-material-lime-A700"],

				"yellow":["btn-material-yellow","btn-material-yellow-400","btn-material-yellow-500","btn-material-yellow-600","btn-material-yellow-700","btn-material-yellow-800","btn-material-yellow-900","btn-material-yellow-A100","btn-material-yellow-A200","btn-material-yellow-A400","btn-material-yellow-A700"],

				"amber":["btn-material-amber","btn-material-amber-400","btn-material-amber-500","btn-material-amber-600","btn-material-amber-700","btn-material-amber-800","btn-material-amber-900","btn-material-amber-A100","btn-material-amber-A200","btn-material-amber-A400","btn-material-amber-A700"],

				"orange":["btn-material-orange","btn-material-orange-400","btn-material-orange-500","btn-material-orange-600","btn-material-orange-700","btn-material-orange-800","btn-material-orange-900","btn-material-orange-A100","btn-material-orange-A200","btn-material-orange-A400","btn-material-orange-A700"],

				"deep-orange":["btn-material-deep-orange","btn-material-deep-orange-400","btn-material-deep-orange-500","btn-material-deep-orange-600","btn-material-deep-orange-700","btn-material-deep-orange-800","btn-material-deep-orange-900","btn-material-deep-orange-A100","btn-material-deep-orange-A200","btn-material-deep-orange-A400","btn-material-deep-orange-A700"]};

			var colorArrayCorelation = {
					"deep-orange":["orange","amber","yellow"],
					"orange":["amber","yellow"],
					"amber":["orange","deep-orange"],
					"yellow":["amber","lime","light-green"],
					"lime":["light-green","green","yellow"],
					"light-green":["lime","green","teal"],
					"green":["teal","light-green","lime"],
					"teal":["green","light-green","lime"],
					"cyan":["teal","green","blue"],
					"light-blue":["teal","indigo","deep-purple"],
					"blue":["indigo","deep-purple","teal"],
					"indigo":["blue","cyan","purple"],
					"deep-purple":["pink","red","orange","deep-orange"],
					"purple":["indigo","blue","pink"],
					"pink":["purple","deep-purple","red"],
					"red":["pink","purple","deep-orange","deep-purple"]
			};
				

			if(!angular.equals(attrs.parent,undefined)){
				var parentColor = $('#courseHeaderBg').attr('randomBg');
				if(!angular.equals(parentColor,undefined)){
					var parentCollection = colorArrayCorelation[parentColor];
					var childColor = parentCollection[Math.floor(Math.random() * (parentCollection.length - 1) + 1)];
					
					var childClass = colorsArray[childColor][Math.floor(Math.random() * (colorsArray[childColor].length - 1))];
					$(element).addClass(childClass);
				}		
			}
			else{

			var randomColor =  colors[Math.floor(Math.random() * (colors.length - 1))];
			var randomClass = colorsArray[randomColor][Math.floor(Math.random() * (colorsArray[randomColor].length - 1))];

			$(element).addClass(randomClass);
			$(element).attr("randomBg",randomColor);
			$(element).removeClass("random-background-color");
			$compile(element)(scope);
			}
		}
	};
}]);