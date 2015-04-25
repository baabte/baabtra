angular.module('baabtra').directive('physicalTestViewerEv', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"=",
			ngModel:"="
		},
		templateUrl: 'angularModules/courseElementFields/physicalTestViewerEv/directives/Directive-physicalTestViewerEv.html',
		link: function(scope, element, attrs, fn) {

//__INITIALISING AND PREPARING DATA_______________________________________________________________________________________________
			
			// initialisisng the return variable
			if(angular.equals(scope.ngModel, undefined)){
				scope.ngModel ={};
			}

			console.log(scope.data);

			// Initialising an array to hold the pass criteria objects
			var passCriteriaArray = [];


			// initialising an array to hold the genders			
			scope.genders = [{label:"Men", value:"Male"}
			, {label:"Women", value:"Female"}];

			// initialising an array to hold the units for evaluation						
			scope.evalUnits = [{label:"Time", value:"Time"}
			, {label:"Number", value:"Number"}
			, {label:"Height", value:"Height"}
			, {label:"Length", value:"Length"}];

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
			{label:"kilomenters", value:"kilomenters"}];

			//array to hold the categorization
			scope.categorizations = [
			{label:"age", value:"age"},
			{label:"height", value:"height"},
			{label:"weight", value:"weight"}];

//_____________________________________________________________________________________________________

		}//End. link
	};
});
