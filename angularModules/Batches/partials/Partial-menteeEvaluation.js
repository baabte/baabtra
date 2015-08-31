angular.module('baabtra').controller('MenteeevaluationCtrl',['$scope','$rootScope','viewBatches','$state','$alert','commonService','attendenceService','$aside','candidateCourseFullView','$modal',
	function($scope,$rootScope,viewBatches,$state,$alert,commonService,attendenceService,$aside,candidateCourseFullView,$modal){

	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	var rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	var roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	var companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/
    var orders;
	var courseMappingId = $state.params.courseId;

	var usersId = $state.params.userId;

	$scope.menteeObj = {};
	$scope.course={};
	$scope.menteeObj.evaluableElement = false;
	$scope.selectedElement={};
	$scope.selectedElement.element='';


	 //====================================
		//this is to manage the progress popup
		$scope.loaderProgressTab=0;
		$scope.progressStart=function () {

				$scope.loaderProgressTab=$scope.loaderProgressTab==4?1:$scope.loaderProgressTab*1+1;
				$scope.$digest();


		};
			var interval=setInterval(function() {
				$scope.progressStart();
			},700);
		//=======================================

 
var loader=$modal({scope: $scope,backdrop:'static', template: 'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html', show: false,placement:'center'});

$scope.startLoader =function(){
loader.$promise.then(loader.show);
};

$scope.stopLoader =function(){
loader.hide();
};

	$scope.$watch('selectedElement',function(){

		if((!angular.equals($scope.selectedElement.element.order,undefined))&&(!angular.equals($scope.selectedElement.element.ElementOrder,undefined))){
        $scope.startLoader();

		orders=$scope.selectedElement["element"]["ElementOrder"];
        
		var courseDetailsResponse = viewBatches.LoadUserCourseevaluation(courseMappingId,orders);
			courseDetailsResponse.then(function(response){
                
				$scope.course = angular.fromJson(JSON.parse(response.data));
				// $scope.course = result;
				
				$scope.courseMappingId=courseMappingId;
				$scope.rm_id=rm_id;
				
                 $scope.stopLoader();
			});
		}

		},true);

	 

	 	var gotCourseSyllabus4CandidateView=candidateCourseFullView.getCourseSyllabus4CandidateView(usersId,courseMappingId);
		gotCourseSyllabus4CandidateView.then(function(data){		    	
                 var res=angular.fromJson(JSON.parse(data.data));
		    	 $scope.candidateCourse=res;
		    	 $scope.courseName=$scope.candidateCourse.syllabus[0]["name"];
		    	 $scope.rolemappingid= res.fkUserRoleMappingId.$oid;
con
		    	 
		});


 
}]);