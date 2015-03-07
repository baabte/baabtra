angular.module('baabtra').controller('viewCandidateCourseCtrl',
	['commonService','$scope','$state','$rootScope','candidateCourseFullView',
	function(commonService,$scope,$state,$rootScope,CCFV){

		 if(!$rootScope.userinfo){
		   commonService.GetUserCredentials($scope);
		   $rootScope.hide_when_root_empty=false;
		 }
		 
		 if(angular.equals($rootScope.loggedIn,false)){
		   $state.go('login');
		 }

		 /*login detils ends*/

		 $scope.lastViewedOrder=0;
		 $scope.lastElement=true;
		 $scope.totalMark=0;
		 $scope.markScored=0;

		 $scope.getElement=function (direction) {
		 	var gotCurrentElement=CCFV.getCurrentElement(userLoginId,courseMappingId,direction);
		    gotCurrentElement.then(function (data) {
		    	
		    	var dataElement=angular.fromJson(JSON.parse(data.data));
		    	if(dataElement=="error"){
					$state.go('home.main.CandidateCourseView');
		    	}
		    	if(dataElement.tlPoint==0){
		    		$scope.tlPointNam='';
		    	}
		    	else{
		    		var selectedDuration=$scope.ddlBindObject[dataElement.selectedDuration-1];
			    	var tlPointName=selectedDuration.name.replace('(s)',' ');
			    	$scope.tlPointName=tlPointName+(Math.ceil(dataElement.tlPoint*selectedDuration.mFactor));
		    	}
		    	$scope.PrevObj=dataElement.element;
		    	$scope.courseId=dataElement.courseId;
		    	$scope.lastViewedOrder=dataElement.lastViewedOrder;
		 		$scope.lastElement=dataElement.lastElement;
		 		$scope.totalMark=dataElement.totalMark;
				$scope.markScored=dataElement.markScored;
		    });
		 };

		 $scope.navigateToTimeline=function(courseId){
				$state.go('home.main.viewCourse',{courseId:courseId.$oid});
			};

		 $scope.navigateToSummary=function(courseId){
				$state.go('home.main.course',{courseId:courseId.$oid});
			};

		$scope.ddlBindObject = {0:{id: "1",name: "Year(s)",mFactor:(1/525600),show:true},
                        1:{id: "2",name: "Month(s)",mFactor:(1/43200),show:true},
                        2:{id: "3",name: "Week(s)",mFactor:(1/10080),show:true},
                        3:{id: "4",name: "Day(s)",mFactor:(1/1440),show:true},
                        4:{id: "5",name: "Hour(s)",mFactor:1/60,show:true},
                        5:{id: "6",name: "Minute(s)",mFactor:1,show:true}};//mFactor is multiplication factor

		var userLoginId=$rootScope.userinfo.userLoginId;
		var courseMappingId=$state.params.courseMappingId;
		$scope.getElement('');



	}]);