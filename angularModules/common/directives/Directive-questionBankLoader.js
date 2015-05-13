angular.module('baabtra').directive('questionBankLoader',['addCourseService','$rootScope',function(addCourseService,
$rootScope) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			ngModel:"="
		},
		templateUrl: 'angularModules/common/directives/Directive-questionBankLoader.html',
		link: function(scope, element, attrs, fn) {
			scope.multi = false;
		
			if(!angular.equals(attrs.multiSelect,undefined)){
				scope.multi = true;
			}

			var companyId ='';
		// var companyId = "54978cc57525614f6e3e70d3"
			if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId){
			  companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;							  
			}
					
		//service call for course fetch
			var questionFetchData={fkcompanyId:companyId};

			var FetchQuestionBankListCallBack= addCourseService.fnFetchQuestionBankList(questionFetchData);

			FetchQuestionBankListCallBack.then(function(data){

			 scope.questionBanklist = angular.fromJson(JSON.parse(data.data));
			       

			});



		}
	};
}]);
