angular.module('baabtra').controller('viewCandidateCourseCtrl',
	['commonService','$scope','$state','$rootScope','candidateCourseFullView','$aside','$modal',function(commonService,$scope,$state,$rootScope,CCFV,$aside,$modal){

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

		 $scope.getElementClicked = false;

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



		 $scope.getElement=function (direction) {
		 	$scope.getElementClicked = true;
		 	var gotCurrentElement=CCFV.getCurrentElement(userLoginId,courseMappingId,direction);
		    gotCurrentElement.then(function (data) {
		    	
		    	var dataElement=angular.fromJson(JSON.parse(data.data));
		    	// console.log(dataElement);
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

		    	//Anoop: pushing the course assigned date into the prevObj
		    	$scope.PrevObj=dataElement.element;
		    	$scope.PrevObj.courseAssignedDate = dataElement.courseAssignedDate;

		    	$scope.courseId=dataElement.courseId;
		    	$scope.lastViewedOrder=dataElement.lastViewedOrder;
		 		$scope.lastElement=dataElement.lastElement;
		 		$scope.totalMark=dataElement.totalMark;
				$scope.markScored=dataElement.markScored;
				$scope.getElementClicked = false;

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
		$scope.selectedElement={};
		$scope.selectedElement.element='';


	
		var gotCourseSyllabus4CandidateView=CCFV.getCourseSyllabus4CandidateView(userLoginId,courseMappingId);
		    gotCourseSyllabus4CandidateView.then(function (data) {		    	
      
		    	 $scope.candidateCourse=angular.fromJson(JSON.parse(data.data));
		    });	

		 
    


// Pre-fetch an external template populated with a custom scope
var courseSyllabusAside = $aside({scope:$scope,placement:'right',animation:'am-slide-right', template: 'angularModules/candidateCourseRelated/candidateCourseView/partials/aside-studentSyllabus.html', show: false});//call aside for add new department
// Show when some event occurs (use $promise property to ensure the template has been loaded)



$scope.showSyllabus =function(){
courseSyllabusAside.$promise.then(courseSyllabusAside.show);
};

$scope.hideSyllabus =function(){
courseSyllabusAside.hide();
};    

var loader=$modal({scope: $scope,backdrop:'static', template: 'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html', show: false,placement:'center'});

$scope.startLoader =function(){
loader.$promise.then(loader.show);
};

$scope.stopLoader =function(){
loader.hide();
};   		    

	

		$scope.$watch('selectedElement',function(){

		if((!angular.equals($scope.selectedElement.element.order,undefined))&&(!angular.equals($scope.selectedElement.element.ElementOrder,undefined))){

		// console.log($scope.selectedElement)

		$scope.startLoader();			

		var gotElement4CandidateView=CCFV.getElement4CandidateView(userLoginId,courseMappingId,$scope.selectedElement.element);
		    gotElement4CandidateView.then(function (data) {		

		    	var dataElement=angular.fromJson(JSON.parse(data.data));
		    	// console.log(dataElement);
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

		    	//Anoop: pushing the course assigned date into the prevObj
		    	$scope.PrevObj=dataElement.element;
		    	$scope.PrevObj.courseAssignedDate = dataElement.courseAssignedDate;

		    	$scope.courseId=dataElement.courseId;
		    	$scope.lastViewedOrder=dataElement.lastViewedOrder;
		 		$scope.lastElement=dataElement.lastElement;
		 		$scope.totalMark=dataElement.totalMark;
				$scope.markScored=dataElement.markScored;
				$scope.getElementClicked = false;
    	
			$scope.stopLoader();
      	
		    	 
		    });	

		}

		},true);




	}]);