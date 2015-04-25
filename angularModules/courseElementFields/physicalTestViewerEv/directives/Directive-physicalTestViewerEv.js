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

			// initialising an array to hold the genders			
			scope.genders = [{label:"Male", value:"Male"}
			, {label:"Female", value:"Female"}];

			//array to hold the categorization
			scope.categorizations = [
			{label:"age", value:"age"},
			{label:"height", value:"height"},
			{label:"weight", value:"weight"}];


			//array to hold the time units
			scope.timeUnits = [
			{label:"seconds", value:"seconds"},
			{label:"minutes", value:"minutes"},			
			{label:"hours", value:"hours"},
			{label:"days", value:"days"}];

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


			console.log(scope.tests);

			// looping through tests to build an array to get the screens for evaluation
			scope.evaluateArray = [];//this array will only have the data relevant to the added type and data present in it			
			var currentType = {};
			var currentCriteria = {};
			
			//looping through the outer object
			for (var i in scope.tests){

				// an object to hold the real details of the candidate which has to be validated against the pass criteria of each type
				scope.tests[i].candidate = {};

				currentType = angular.copy(scope.tests[i]);

				//looping through the pass criteria objects in the current test object to build the data
				var categorizationArray = [];
				var genderArray = [];
				var evalUnitsArray = [];
				var perTimeUnitArray = [];
				var checkCategory = false;
				var categoryFree = false;
				var checkGender  = false;
				var genderFree = false;
				var checkPer = false;
				var perFree = false;
			// =============================================
				for (var j in currentType.passCriteria) {
				
					currentCriteria = currentType.passCriteria[j];

					
					if(currentCriteria.checkCategory){
						checkCategory = true;
						if(angular.equals(categorizationArray.indexOf(currentCriteria.categorization), -1)){

							categorizationArray.push(currentCriteria.categorization)
						}
					}
					else{
						categoryFree = true;
						scope.tests[i].candidate.categoryFree = true;
					}

					if(currentCriteria.checkGender){
						checkGender = true;

						if(angular.equals(genderArray.indexOf(currentCriteria.gender), -1)){
							genderArray.push(currentCriteria.gender)
						}

					}
					else{
						genderFree = true;
						scope.tests[i].candidate.genderFree = true;
					}

					//checking the per {{minutes}} option
					if(currentCriteria.per){
						checkPer = true;

						if(angular.equals(perTimeUnitArray.indexOf(currentCriteria.perTimeUnit), -1)){
							perTimeUnitArray.push(currentCriteria.perTimeUnit)
						}

					}
					else{
						perFree = true;
						scope.tests[i].candidate.perFree = true;
					}


					if(angular.equals(evalUnitsArray.indexOf(currentCriteria.evalUnit), -1)){
							evalUnitsArray.push(currentCriteria.evalUnit)
					}

					

				} //. for currentType.passCriteria
			// =============================================

			// building the gender object
			if(genderArray.length){
				var genderOptions = [];
				for(var k in genderArray){
					// initialising an array to hold the genders			
					genderOptions.push({label:genderArray[k], value:genderArray[k]});			
				}
				scope.tests[i].candidate.gender = genderArray[0];
			}

			// building the categirization object
			if(perTimeUnitArray.length){
				var perTimeUnitsOptions = [];
				for(var k in perTimeUnitArray){
					// initialising an array to hold the genders			
					perTimeUnitsOptions.push({label:perTimeUnitArray[k], value:perTimeUnitArray[k]});
					
				}
				scope.tests[i].candidate.perTimeUnit = perTimeUnitArray[0];
			}

			// building the categirization object
			if(categorizationArray.length){
				var categorizationOptions = [];
				for(var k in categorizationArray){
					// initialising an array to hold the genders			
					categorizationOptions.push({label:categorizationArray[k], value:categorizationArray[k]});
					
				}
				scope.tests[i].candidate.categorization = categorizationArray[0];
			}

			// building the evalUnits object
			if(evalUnitsArray.length){
				var evalUnitsOptions = [];
				for(var k in evalUnitsArray){
					// initialising an array to hold the genders			
					evalUnitsOptions.push({label:evalUnitsArray[k], value:evalUnitsArray[k]});
			
				}
				scope.tests[i].candidate.evalUnit = evalUnitsArray[0];
				
			}

			// attaching these values to the current type
			if(!categoryFree){
				currentType.categorizationArray = categorizationOptions;
			}
			else{
				currentType.categorizationArray = scope.categorizations;
				scope.tests[i].candidate.categorization = 'age';
			}

			if(!genderFree){
				currentType.genderArray = genderOptions;
			}
			else{
				currentType.genderArray = scope.genders;
				scope.tests[i].candidate.gender = 'Male';
			}

			if(!perFree){
				currentType.perTimeUnitArray = perTimeUnitsOptions;
			}
			else{
				currentType.perTimeUnitArray = scope.timeUnits;
				scope.tests[i].candidate.perTimeUnit = 'minutes';
			}



			currentType.evalUnitsArray = evalUnitsOptions;
			currentType.checkCategory = checkCategory;
			currentType.checkGender  = checkGender;
			currentType.checkPer  = checkPer;

			scope.tests[i].candidate.timeUnit = 'seconds';
			scope.tests[i].candidate.lengthUnit = 'centimeters';

			scope.evaluateArray.push(currentType);

			}//for. tests

//_____________________________________________________________________________________

		// function to check whether the candidate is passed or failed
		var validate = function(candidate){

		}







		}//End. link
	};
});
