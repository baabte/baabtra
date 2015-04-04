angular.module('baabtra').directive('customFormAttributes', function() {
	return {
		restrict: 'E',
		replace: true,
		require: 'ngModel',
		scope: {
			attList:"=ngModel"
		},
		templateUrl: 'angularModules/courseElementFieldsManaging/directives/Directive-customFormAttributes.html',
		link: function(scope, element, attrs, fn) {
			optionCounter=1;
			scope.field={};
			//scope.attList=[{"text":"","value":"Attribute1"}];
			  	
			  	// Monitor for changes in the options array and ensure a
  				// watch for every option value.
  				// Watchers are deleted when removing options from the array.

			  scope.$watchCollection('attList', function(options) {
			    if (options) {
			      angular.forEach(options, function(option) {
			        if (!option.$_valueWatchFn) {
			          option.$_valueWatchFn = scope.$watch(function() {
			            return option.value;
			          }, handleValueChange);
			        }
			      });
			    }
			  });

			  scope.handleValueChange=function(newValue, oldValue) {

			    // Called by the watch collection
			    // Ensure that when the selected value is changed, this
			    // is synced to the field value.

			    if (newValue !== oldValue) {
			      if (scope.multiple) {
			        scope.field.value[newValue] = scope.field.value[oldValue];
			        delete scope.field.value[oldValue];
			      } else {
			        if (oldValue === scope.field.value) {
			          scope.field.value = newValue;
			        }
			      }
			    }
			  };

			  //to add new attribute
			  scope.addOption = function() {

			    if (!scope.attList) {
			      scope.attList = [];
			    }

			    var option = {
			      value: 'Attribute ' + optionCounter++,
			      text:""
			    };

			    scope.attList.push(option);

			    var count = scope.attList.length;

			    /*if(!scope.multiple && count === 1) {
			      scope.field.value = option.value;
			    }*/

			  };

			  //to remove the attrribute
			  scope.removeOption = function(index) {
			    var options = scope.attList.splice(index, 1);

			    if (options && options.length) {

			      var option = options[0];

			      if (scope.multiple) {

			        if(scope.field.value[option.value] !== undefined)
			          delete scope.field.value[option.value];

			      } else {

			        if (option.value === scope.field.value && scope.attList.length) {
			          scope.field.value = scope.attList[0].value;
			        }

			        option.$_valueWatchFn();
			      }
			    }
			  };
		}
	};
});
