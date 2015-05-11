angular.module('baabtra').controller('QuestionbankviewCtrl',['$scope','bbConfig','$rootScope','$state','commonService','$alert','$modal','$aside','questionBankService',function($scope,bbConfig,$rootScope,$state,commonService,$alert,$modal,$aside,questionBankService){

if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}

var loggedusercrmid=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
var companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;

$scope.expand=false;


// Pre-fetch an external template populated with a custom scope
    var createQuestionsetAside = $aside({scope: $scope, template: 'angularModules/questionBank/partials/aside-CreateQuestionset.html', show: false,placement:'top'});
// Show when some event occurs (use $promise property to ensure the template has been loaded)



$scope.fnCreateQuestionsetModalActivate =function(){
createQuestionsetAside.$promise.then(createQuestionsetAside.show)
}

$scope.fnCreateQuestionsetModalDeactivate =function(){
createQuestionsetAside.hide();
}

// Pre-fetch an external template populated with a custom scope
    var questionModal = $modal({scope: $scope, template: 'angularModules/questionRelated/questionGroup/directives/Modal-question.html', show: false,placement:'top'});
// Show when some event occurs (use $promise property to ensure the template has been loaded)



 $scope.questionShowActivate =function(){
		    	 questionModal.$promise.then(questionModal.show);
		    	
		    };

 $scope.questionShowDeactivate =function(){
		    	 questionModal.hide();		    	
		    };
		    
		   

		   


}]);