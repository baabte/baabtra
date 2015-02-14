angular.module('baabtra').controller('CourseelementfieldsmanagingCtrl',['$scope','$rootScope','commonService', 'courseElementFieldsManaging', '$alert',function ($scope, $rootScope, commonService, courseElementFieldsManaging, $alert){


  /*login detils start*/
  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

  $scope.coursePreviewObject={};
  $scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  $scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  /*login detils ends*/

  var courseElementFields = courseElementFieldsManaging.fnGetCourseElementFields();
  courseElementFields.then(function(response){
  	$scope.courseElementFields = angular.fromJson(JSON.parse(response.data));
  });

$scope.palette = [{"id": "1","name": "Text input fields"},
				  {"id": "2","name": "Checkbox fields"},
				  {"id": "3","name": "Select input fields"},
				  {"id": "4","name": "Other fields"},
				  {"id": "5","name": "Course element fields"}];

  $scope.saveCourseElementFields = function(){//for save course element
  	$scope.element.updatedDate = Date();
  	$scope.element.urmId = $scope.rm_id;
  	$scope.element.activeFlag = 1;

  	if (!angular.equals($scope.element._id,undefined)) {
  		$scope.element.crmId = $scope.element.crmId.$oid;
  		$scope.element._id = $scope.element._id.$oid?$scope.element._id.$oid:$scope.element._id;
  	}
  	else{
  		$scope.element.crmId = $scope.rm_id;
  		$scope.element.createdDate = Date();
  	}

  	var saveCourseElement = courseElementFieldsManaging.fnSaveCourseElementFields($scope.element);//calling service fn for save course element
  	
  	saveCourseElement.then(function(response){
  		var result = angular.fromJson(JSON.parse(response.data));
  		$alert({title: 'Done!', content: result.msg, placement: 'top-right', type: 'success', show: true, animation:'am-fade-and-slide-right', duration:5});
  		$scope.courseElementFields = result.data;
  		$scope.element = {};
  	});

  };

  $scope.editCourseElement = function(courseElement){
  	$scope.element = courseElement;
  };

  var lasteDeletedId = 0;
  $scope.fnDeleteCourseElementFields = function(elementId){
  	var manageType = {};
  	manageType.activeFlag = 0;
  	lasteDeletedId = elementId;
  	var deleteElement = courseElementFieldsManaging.fnDeleteCourseElementFields(elementId, manageType, $scope.rm_id);
  	deleteElement.then(function(response){
  		$scope.element = {};
  		var udoElement = $alert({scope: $scope,container:'body',keyboard:true,animation:'am-fade-and-slide-top',template:'views/ui/angular-strap/alert.tpl.html',title:'Undo',content:'The course element has been deleted', placement: 'top-right', type: 'warning'});
  		var result = angular.fromJson(JSON.parse(response.data));
  		$scope.courseElementFields = result;

  	});

  };

  $scope.undo = function(){
  	var manageType = {};
  	manageType.activeFlag = 1;
  	var undoDelete = courseElementFieldsManaging.fnDeleteCourseElementFields(lasteDeletedId, manageType, $scope.rm_id);
  	
  	undoDelete.then(function(response){
  		var result = angular.fromJson(JSON.parse(response.data));
  		$scope.courseElementFields = result;
  	});
  };

}]);