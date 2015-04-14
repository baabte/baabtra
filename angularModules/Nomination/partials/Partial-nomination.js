angular.module('baabtra').controller('NominationCtrl',['$scope','bbConfig','$rootScope', '$state', '$modal','commonService', 'formCustomizerService', 'addCourseService', 'nomination', '$alert', function($scope,bbConfig, $rootScope, $state, $modal, commonService, formCustomizerService, addCourseService, nomination, $alert){

	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/


$scope.status={};
$scope.status.selected=1;
$scope.allSync={}; //the variable to pass data in controller to syncdata
// $scope.status.selected=0;
$scope.allSync.newUser=false;
$scope.allSync.FormData={}; // formdata to keep all form inserted data
var mandatoryFields=[];
var formFetchData={};
formFetchData.fkcompanyId=companyId;//to fetch forms from clnCustomForms
formFetchData.formName='userRegistration';//to fetch all the froms give specific name to fetch that form only
// formFetchData.formName='signUp';//to fetch all the froms give specific name to fetch that form only

//sevice call to fetch form 
var FnFetchCustomFormCallBack= formCustomizerService.FnFetchCustomForm(formFetchData);

FnFetchCustomFormCallBack.then(function(data){

 var result=angular.fromJson(JSON.parse(data.data));
// console.log(result);
 $scope.formlist=result.formlist;
      
      // console.log($scope.formlist);  
$scope.stepCount=$scope.formlist.formSteps;
//to get the mandtory from field name in an array 
    for(var i in $scope.formlist.formSchema){
      for(var x in $scope.formlist.formSchema[i].stepFormSchema.fields){
       if(angular.equals($scope.formlist.formSchema[i].stepFormSchema.fields[x].name,'role')||angular.equals($scope.formlist.formSchema[i].stepFormSchema.fields[x].name,'Branch'))
       {}
       else{
      mandatoryFields.push($scope.formlist.formSchema[i].stepFormSchema.fields[x].name);
     }
    } 
    }

    //nedd to improve the call with role id\\//
    if(!angular.equals(companyId,'')){
    var FetchSpecificFormObj={companyId:companyId,fetchFormName:"userRegistration"};
       var fnFetchSpecificCustomFormCallBack= formCustomizerService.FnFetchSpecificCustomForm(FetchSpecificFormObj);
      fnFetchSpecificCustomFormCallBack.then(function  (data) {

        var result=angular.fromJson(JSON.parse(data.data));

        $scope.roleSchema=result.roleSchema.roleSchema;        

        

        $scope.roleId=bbConfig.MURID;

        $scope.role={};//to keep the schema of form

        if($scope.roleId){
            $scope.allSync.FormData.role={};
            $scope.allSync.FormData.role.roleId=$scope.roleId;
        for(var index in $scope.roleSchema){
          if (angular.equals($scope.roleSchema[index].roleId,$scope.roleId)){
            $scope.role.roleId=$scope.roleId;
            $scope.role.formSchema=$scope.roleSchema[index].formSchema;
            $scope.role.formSteps=$scope.roleSchema[index].formSteps;
            console.log($scope.role);  
            $scope.allSync.FormData.role=$scope.role;                  
          }

        }
        
      }

      });
    }else{
       $scope.allSync.FormData.role={};
       $scope.allSync.FormData.role.roleId=bbConfig.MURID;
    }
    // console.log(mandatoryFields)   
});

$scope.$watch('allSync.FormData.role', function(){
if(!angular.equals($scope.formlist,undefined) && !angular.equals($scope.allSync.FormData.role,undefined)){
        $scope.stepCount= $scope.formlist.formSteps;
        while(!angular.equals($scope.formlist.formSchema[++$scope.stepCount],undefined)){
          // console.log($scope.stepCount);
          delete $scope.formlist.formSchema[$scope.stepCount];
        }

        $scope.stepCount= $scope.formlist.formSteps;
        if($scope.allSync.FormData.role.formSchema){    
              for(var i in $scope.allSync.FormData.role.formSchema){

                  $scope.formlist.formSchema[++$scope.stepCount]=$scope.allSync.FormData.role.formSchema[i];
                             
              }
              // console.log($scope.formlist.formSteps);
            }
    }
                
    }, true);

$scope.data = {};

if(!angular.equals($state.params.ofId,"")){
	var orderFormResponse = nomination.fnLoadOrderFormById($state.params.ofId);
	orderFormResponse.then(function(response){
		var orderForm = angular.fromJson(JSON.parse(response.data));
		orderForm._id = orderForm._id.$oid;
		$scope.data.orderForm = orderForm;
	});
}




$scope.fnUserRegister =function () {
	console.log($scope.allSync.FormData);
	var time=(new Date()).valueOf();
	hashids = new Hashids("this is a id for mentees");
	var userUniqueId = 'RQ-' + hashids.encode(time);
	var courseExits = false;
	var userinfo = { eMail:$scope.allSync.FormData.eMail, firstName:$scope.allSync.FormData.firstName, lastName:$scope.allSync.FormData.lastName, dob:$scope.allSync.FormData.dob, status:"requested", userId:userUniqueId };

	if(angular.equals($scope.data.orderForm,undefined)){
		$scope.data.orderForm = {};
		var time=(new Date()).valueOf();
		hashids = new Hashids("this is a order form id");
		var orderFormId = 'OF-' + hashids.encode(time);
		var orderFormData = {};
		
		$scope.data.orderForm.companyId = companyId;
		$scope.data.orderForm.orderFormId = orderFormId;
		$scope.data.orderForm.orderDetails = [];

		
		var courseLoadResponse = addCourseService.fnLoadCourseDetails($scope, $scope.allSync.FormData.course._id);

		courseLoadResponse.then(function(course){
	    	var course = angular.fromJson(JSON.parse(course.data)).courseDetails;
	    	var courseDetails = {};
	    	courseDetails.courseId = course._id.$oid;

	    	courseDetails.Name = course.Name;
	    	if(!course.Fees.free){
	    		courseDetails.currency = course.Fees.currency;
	    		courseDetails.coursePrice = course.Fees.totalAmount;
	    	}
	    	courseDetails.userCount = 1;
	    	courseDetails.userInfo = [];

	    	courseDetails.userInfo.push(userinfo);
	    	courseDetails.coursetype = $scope.allSync.FormData.coursetype;

	    	$scope.data.orderForm.orderDetails.push(courseDetails);

			var nomintaionResponse = nomination.fnAddUserNomination($scope.data.orderForm, $scope.rm_id);
			nomintaionResponse.then(function(response){
				var orderForm = angular.fromJson(JSON.parse(response.data));
				orderForm._id = orderForm._id.$oid;
				$scope.data.orderForm = orderForm;
				$alert({title: 'Done..!', content: 'Mentees Registered Successfully :-)', placement: 'top-right',duration:3 ,animation:'am-slide-bottom', type: 'success', show: true});
				$state.go('home.main.nominateEmployee',{ofId:$scope.data.orderForm.orderFormId});
			});
		});	
	}
	else{
		var courseIndex = 0;
		var courseLoadResponse = addCourseService.fnLoadCourseDetails($scope, $scope.allSync.FormData.course._id);
		courseLoadResponse.then(function(course){
     		var course = angular.fromJson(JSON.parse(course.data)).courseDetails;
     		
			for (var courseCount = 0; courseCount < $scope.data.orderForm.orderDetails.length; courseCount++) {
				if(angular.equals($scope.data.orderForm.orderDetails[courseCount].courseId, course._id.$oid)){
					courseIndex = courseCount;
					courseExits = true;
					break;
				}
			}

			
		if(courseExits){
			$scope.data.orderForm.orderDetails[courseIndex].userInfo.push(userinfo);
			$scope.data.orderForm.orderDetails[courseIndex].userCount++;

			var nomintaionResponse = nomination.fnAddUserNomination($scope.data.orderForm, $scope.rm_id);
			nomintaionResponse.then(function(response){
				var orderForm = angular.fromJson(JSON.parse(response.data));
				orderForm._id = orderForm._id.$oid;
				$scope.data.orderForm = orderForm;
				$alert({title: 'Done..!', content: 'Mentees Registered Successfully :-)', placement: 'top-right',duration:3 ,animation:'am-slide-bottom', type: 'success', show: true});
				$state.go('home.main.nominateEmployee',{ofId:$scope.data.orderForm.orderFormId});
			});

		}
		else{
			var courseLoadResponse = addCourseService.fnLoadCourseDetails($scope, $scope.allSync.FormData.course._id);

			courseLoadResponse.then(function(course){
		    	var course = angular.fromJson(JSON.parse(course.data)).courseDetails;
		    	var courseDetails = {};
		    	courseDetails.courseId = course._id.$oid;

		    	courseDetails.Name = course.Name;
		    	if(!course.Fees.free){
		    		courseDetails.currency = course.Fees.currency;
		    		courseDetails.coursePrice = course.Fees.totalAmount;
		    	}
		    	courseDetails.userCount = 1;
		    	courseDetails.userInfo = [];

		    	courseDetails.userInfo.push(userinfo);
		    	courseDetails.coursetype = $scope.allSync.FormData.coursetype;

		    	$scope.data.orderForm.orderDetails.push(courseDetails);
		    	
				var nomintaionResponse = nomination.fnAddUserNomination($scope.data.orderForm, $scope.rm_id);
				nomintaionResponse.then(function(response){
					var orderForm = angular.fromJson(JSON.parse(response.data));
					orderForm._id = orderForm._id.$oid;
					$scope.data.orderForm = orderForm;
					$alert({title: 'Done..!', content: 'Mentees Registered Successfully :-)', placement: 'top-right',duration:3 ,animation:'am-slide-bottom', type: 'success', show: true});
					$state.go('home.main.nominateEmployee',{ofId:$scope.data.orderForm.orderFormId});
				});
			});	
		}
    });
}
};

$scope.finshRegisteration = function(){
	if(Object.keys($scope.allSync.FormData.course).length){
		$scope.fnUserRegister();
	}
	setTimeout(function(){ $modal({scope: $scope, template: 'angularModules/Nomination/partials/popup-orderForm.html', show: true});
	 }, 1000);
	};

}]);