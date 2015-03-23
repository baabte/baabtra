angular.module('baabtra').controller('NominationCtrl',['$scope', '$rootScope', 'commonService', 'formCustomizerService', function($scope, $rootScope, commonService, formCustomizerService){

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
	var companyId = "54978cc57525614f6e3e710b";
	//var companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
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
if(!angular.equals($scope.formlist,undefined)){
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





}]);