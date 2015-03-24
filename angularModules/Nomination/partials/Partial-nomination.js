angular.module('baabtra').controller('NominationCtrl',['$scope', '$rootScope', '$state', '$modal','commonService', 'formCustomizerService', 'addCourseService', 'nomination', '$alert', function($scope, $rootScope, $state, $modal, commonService, formCustomizerService, addCourseService, nomination, $alert){

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
var formFetchData = {};
formFetchData.fkcompanyId = "";//to fetch forms from clnCustomForms
formFetchData.formName = 'userRegistration';//to fetch all the froms give specific name to fetch that form only
// formFetchData.formName='signUp';//to fetch all the froms give specific name to fetch that form only

//sevice call to fetch form 
var FnFetchCustomFormCallBack= formCustomizerService.FnFetchCustomForm(formFetchData);

FnFetchCustomFormCallBack.then(function(response){
 var result=angular.fromJson(JSON.parse(response.data));
// console.log(result);
 $scope.formlist=result.formlist;
      
      // console.log($scope.formlist);  
$scope.stepCount=$scope.formlist.formSteps;
//to get the mandtory from field name in an array 
for(var i in $scope.formlist.formSchema){
    for(var x in $scope.formlist.formSchema[i].stepFormSchema.fields){
       if(angular.equals($scope.formlist.formSchema[i].stepFormSchema.fields[x].name,'role')||angular.equals($scope.formlist.formSchema[i].stepFormSchema.fields[x].name,'Branch'))
       {
       }
       else{
      mandatoryFields.push($scope.formlist.formSchema[i].stepFormSchema.fields[x].name);
     }
    } 
    }
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
	console.log($scope.allSync.FormData.coursetype);
	var time=(new Date()).valueOf();
	hashids = new Hashids("this is a id for mentees");
	var userUniqueId = 'RQ-' + hashids.encode(time);

	if(angular.equals($scope.data.orderForm,undefined)){
		$scope.data.orderForm = {};
		var time=(new Date()).valueOf();
		hashids = new Hashids("this is a order form id");
		var orderFormId = 'OF-' + hashids.encode(time);
		var orderFormData = {};
		$scope.data.orderForm.companyId = companyId;
		$scope.data.orderForm.orderFormId = orderFormId;
		$scope.data.orderForm.orderDetails = {};
		$scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id] = {};

		var courseLoadResponse = addCourseService.fnLoadCourseDetails($scope, $scope.allSync.FormData.course._id);

		courseLoadResponse.then(function(course){
	    	var course = angular.fromJson(JSON.parse(course.data)).courseDetails;
	    	$scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id].Name = course.Name;
	    	if(!angular.equals(course.Fees.totalAmount,undefined)){
	    		$scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id].coursePrice  = course.Fees.totalAmount;
	    	}
	    	else{
	    		$scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id].coursePrice = 0;
	    	}
	    	
	    	$scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id].userCount = 1;

	    	$scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id].userInfo = [];

			$scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id].userInfo.push({eMail:$scope.allSync.FormData.eMail, firstName:$scope.allSync.FormData.firstName, lastName:$scope.allSync.FormData.lastName, dob:$scope.allSync.FormData.dob, status:"requested", userId:userUniqueId});

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
		if(angular.equals($scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id], undefined)){
			$scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id] = {};
			var courseLoadResponse = addCourseService.fnLoadCourseDetails($scope, $scope.allSync.FormData.course._id);

			courseLoadResponse.then(function(course){
    		var course = angular.fromJson(JSON.parse(course.data)).courseDetails;

    		$scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id].Name = course.Name;
    		$scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id].coursetype = $scope.allSync.FormData.coursetype;
    		if(!angular.equals(course.Fees.totalAmount,undefined)){
    			$scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id].coursePrice  = course.Fees.totalAmount;
    		}
    		else{
    			$scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id].coursePrice = 0;
    		}
    	
    		$scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id].userCount = 1;

    		$scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id].userInfo = [];

			$scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id].userInfo.push({eMail:$scope.allSync.FormData.eMail, firstName:$scope.allSync.FormData.firstName, lastName:$scope.allSync.FormData.lastName, dob:$scope.allSync.FormData.dob, status:"requested", userId:userUniqueId});

			var nomintaionResponse = nomination.fnAddUserNomination($scope.data.orderForm, $scope.rm_id);
				nomintaionResponse.then(function(response){
					var orderForm = angular.fromJson(JSON.parse(response.data));
					orderForm._id = orderForm._id.$oid;
					$scope.data.orderForm = orderForm;
					$scope.allSync.FormData = "";
					$scope.status.selected = 1;
					$scope.userRegistrationForm.$setPristine();
					$alert({title: 'Done..!', content: 'Mentee Registered Successfully :-)', placement: 'top-right',duration:3 ,animation:'am-slide-bottom', type: 'success', show: true});

				});
			});
		}
		else{
			$scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id].userCount = $scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id].userCount + 1;

			$scope.data.orderForm.orderDetails[$scope.allSync.FormData.course._id].userInfo.push({eMail:$scope.allSync.FormData.eMail, firstName:$scope.allSync.FormData.firstName, lastName:$scope.allSync.FormData.lastName, dob:$scope.allSync.FormData.dob, status:"requested", userId:userUniqueId});
			var nomintaionResponse = nomination.fnAddUserNomination($scope.data.orderForm, $scope.rm_id);
				nomintaionResponse.then(function(response){
					var orderForm = angular.fromJson(JSON.parse(response.data));
					orderForm._id = orderForm._id.$oid;
					$scope.data.orderForm = orderForm;
					$scope.allSync.FormData = "";
					$scope.status.selected = 1;
					$scope.userRegistrationForm.$setPristine();
					$alert({title: 'Done..!', content: 'Mentee Registered Successfully :-)', placement: 'top-right',duration:3 ,animation:'am-slide-bottom', type: 'success', show: true});
				});
		}
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