angular.module('baabtra').directive('physicalTestViewerEv', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"="
		},
		templateUrl: 'angularModules/courseElementFields/physicalTestViewerEv/directives/Directive-physicalTestViewerEv.html',
		link: function(scope, element, attrs, fn) {

//__INITIALISING AND PREPARING DATA_______________________________________________________________________________________________
			


			// initialisisng the return variable
			if(angular.equals(scope.result, undefined)){
				scope.result = scope.$parent.result[parseInt(attrs.index)];
				scope.result.data = angular.copy(scope.data);
			}

			
		

			//array to hold the time units
			scope.timeUnits = [
			{label:"minutes", value:"minutes"},
			{label:"days", value:"days"},
			{label:"hours", value:"hours"}];

			//array to hold the length units
			scope.distanceArray = ['Height','Length'];
			scope.lengthUnits = [
			{label:"centimeters", value:"centimeters"},
			{label:"meters", value:"meters"},
			{label:"kilometers", value:"kilometers"}];

			

//_____________________________________________________________________________________________________
// manipulating the data to build a more consise object to show to the user

			// Initialising an array to hold the pass criteria objects
			var passCriteriaArray = [];

			//taking the test object into an array
			scope.tests = scope.result.data.value.tests;

			console.log(tests);

			// looping through tests to build an array to get the screens for evaluation
			scope.evaluateArray = [];//this array will only have the data relevant to the added type and data present in it
			var evaluateObj = {};
			var currentType = {};
			var currentCriteria = {};
			
			//looping through the outer object
			for (var i in tests){

				currentType = angular.copy(tests[i]);

				//looping through the pass criteria objects in the current test object to build the data
				var categorizationArray = [];
				var genderArray = [];
				var evalUnitsArray = [];
				var checkCategory = false;
				var checkGender  = false;
			// =============================================
				for (var j in currentType.passCriteria) {
				
					currentCriteria = currentType.passCriteria[j];

					
					if(currentCriteria.checkCategory){
						checkCategory = true;
						if(angular.equals(categorizationArray.indexOf(currentCriteria.categorization), -1)){

						categorizationArray.push(currentCriteria.categorization)
					}
					}

					if(currentCriteria.checkGender){
						checkGender = true;

						if(angular.equals(genderArray.indexOf(currentCriteria.gender), -1)){
							genderArray.push(currentCriteria.gender)
						}

					}

					if(angular.equals(evalUnitsArray.indexOf(currentCriteria.evalUnit), -1)){
							evalUnitsArray.push(currentCriteria.evalUnit)
						}

					

				} //. for currentType.passCriteria
			// =============================================

			// building the gender object
			if(genderArray.length){
				var genderOptions = [];
				for(var i in genderArray){
					// initialising an array to hold the genders			
					genderOptions.push({label:genderArray[i], value:genderArray[i]});
			
				}
			}

			// building the categirization object
			if(categorizationArray.length){
				var categorizationOptions = [];
				for(var i in categorizationArray){
					// initialising an array to hold the genders			
					categorizationOptions.push({label:categorizationArray[i], value:categorizationArray[i]});
			
				}
			}

			// building the evalUnits object
			if(evalUnitsArray.length){
				var evalUnitsOptions = [];
				for(var i in evalUnitsArray){
					// initialising an array to hold the genders			
					evalUnitsOptions.push({label:evalUnitsArray[i], value:evalUnitsArray[i]});
			
				}
			}

			// attaching these values to the current type
			currentType.categorizationArray = categorizationOptions;
			currentType.genderArray = genderOptions;
			currentType.evalUnitsArray = evalUnitsOptions;
			currentType.checkCategory = checkCategory;
			currentType.checkGender  = checkGender;

			scope.evaluateArray.push(currentType);

			}//for. tests

//_____________________________________________________________________________________


		}//End. link
	};
});
