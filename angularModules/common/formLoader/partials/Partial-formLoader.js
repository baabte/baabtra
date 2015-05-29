angular.module('baabtra').controller('FormloaderCtrl',['$scope', '$state', 'formLoader', 'userRegistrationService',function ($scope, $state ,formLoader, userRegistrationService){

	$scope.data = {};
	var LoadCustomForm = formLoader.LoadCustomFormforRegistration($state.params.companyId, $state.params.formId);
	LoadCustomForm.then(function(response){
		var result = angular.fromJson(JSON.parse(response.data));
		if(Object.keys(result).length){
			$scope.data.form = result;
			$scope.data.formSteps = Object.keys($scope.data.form);
			$scope.data.currentStepIndex = 0;
			$scope.data.currentStep = $scope.data.formSteps[$scope.data.currentStepIndex];
			$scope.data.width = 100/$scope.data.formSteps.length;
			$scope.data.formOut = {};
		}
	});

	$scope.nextStep = function(){
		$scope.data.currentStepIndex = $scope.data.formSteps.indexOf($scope.data.currentStep) + 1;
		$scope.data.currentStep = $scope.data.formSteps[$scope.data.currentStepIndex];
	};

	$scope.previousStep = function(){
		$scope.data.currentStepIndex = $scope.data.formSteps.indexOf($scope.data.currentStep) - 1;
		$scope.data.currentStep = $scope.data.formSteps[$scope.data.currentStepIndex];
	};

	function jsonConcat(o1, o2) {
		for (var key in o2) {
			o1[key] = o2[key];
		}
		return o1;
	}

	$scope.submitUserDetails = function(){
		
		var userDetails = {};
		userDetails.role = {roleId:3};
		userDetails.companyId = $state.params.companyId;

		var output = {};
		for(var step in $scope.data.formOut){
			
		output = jsonConcat(output, $scope.data.formOut[step]);
		}
		var mandatoryData = output;

		userDetails.mandatoryData = mandatoryData;
		
		var fnRegisterUserCallBack = userRegistrationService.FnRegisterUser(userDetails);

		fnRegisterUserCallBack.then(function(data){
			var result=angular.fromJson(JSON.parse(data.data));
			console.log(userDetails);
			console.log(result);
		})
	};

}]);