angular.module('baabtra').controller('ViewmarksheetCtrl',['$scope', '$rootScope', '$state', 'commonService', 'viewBatches', function ($scope, $rootScope, $state, commonService, viewBatches){

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

  var courseId = $state.params.courseId;
  var usersList = [$state.params.userId];
  
  $scope.menteeMarkSheet = {};

  var courseDetailsResponse = viewBatches.LoadUserCourseDetails(usersList, courseId);
  courseDetailsResponse.then(function(response){
  	var result = angular.fromJson(JSON.parse(response.data));
    $scope.menteeMarkSheet.syllabus = result[0].syllabus;
    console.log($scope.menteeMarkSheet.syllabus);
  });

}]);