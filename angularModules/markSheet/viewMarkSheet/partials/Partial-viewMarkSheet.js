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
  var markSheet = {};
  function fnBuildmarkSheet(syllabus, markSheet){
      for(var index in syllabus){
        markSheet[index] = {};
        markSheet[index].name = syllabus[index].name;
        if(angular.equals(syllabus[index].mark.type, 'mark')){
          if(angular.equals(syllabus[index].markScored, undefined))
          markSheet[index].markScored = syllabus[index].markScored;
        }
        if(syllabus[index].children.length){
          fnBuildmarkSheet(syllabus[index].children, markSheet[index]);
        }
      }
    };


  var getMarkInAllLevel = function(syllabus,index){
    //for(var index in syllabus){
      if(syllabus[index].mark.type=='mark'&&syllabus[index].children.length==0){
        return syllabus[index].mark;
      }
      else if(syllabus[index].mark.type=='mark'){
        var mark=getMarkInAllLevel(syllabus[index].children,0);
        console.log(mark);
        if(mark.type=='mark'){
          syllabus[index].mark.markScored=((mark.markScored/mark.maxMark)*syllabus[index].mark.maxMark)/syllabus[index].children.length;
          return syllabus[index].mark;
        }
        else if(syllabus.length>(index+1)){
          return getMarkInAllLevel(syllabus,index+1);
        }
        
        
      }
      else{
          return {type:'no-mark'};
        }
      
    //}
  };



  var courseDetailsResponse = viewBatches.LoadUserCourseDetails(usersList, courseId);
  courseDetailsResponse.then(function(response){
  	var result = angular.fromJson(JSON.parse(response.data));
    $scope.menteeMarkSheet.course = result[0];
    $scope.menteeMarkSheet.markSheet = $scope.menteeMarkSheet.course.syllabus;
    //fnBuildmarkSheet(syllabus, markSheet);
    var objTest=getMarkInAllLevel($scope.menteeMarkSheet.course.syllabus,0);
    console.log($scope.menteeMarkSheet.course.syllabus);
  });

}]);