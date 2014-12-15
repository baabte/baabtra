/*
Created By  : Jihin
Created Date:20/11/2014 
*/
angular.module('baabtra').controller('JobpostingCtrl',['$scope','JobSrv','$alert',function ($scope,JobSrv,$alert){



  var loginInfo=localStorageService.get('loginInfo');
  if(loginInfo===null||loginInfo.length===0){
       $location.path('/'); //setting the location path to login page if local storage contain null value.
    }
    if(localStorageService.get('loginInfo').length!==0){ //checking for data in local storage
      $scope.userRoleMappingId=loginInfo.roleMappingId.$oid; //gets the last logged role mapping id from local storage
      if(loginInfo.roleMappingObj[0].fkCompanyId==""){
        $scope.companyId='';
      }
      else{
        $scope.companyId=$scope.companyState=loginInfo.roleMappingObj[0].fkCompanyId.$oid;          
      }        
      $scope.roleId=loginInfo.roleMappingObj[0].fkRoleId;
      if($scope.roleId!=1 && $scope.roleId!=2){ //checking for login role id 
          $location.path('/home');
      }      
    }



//var cmp_id='5457526122588a5db73e0b23';
//$scope.rm_id='545aff95437b389ba554d6b7';
$scope.PostJob=function()//To post jobs when click post job button
{
	$scope.jobDetails={};
	var temTags=$scope.Job.Tag.split(',');//Split Tags with coma
	var newTags=[];
	for (var i = 0; i < temTags.length; i++) {//to remove empty elements from Tags
		if (temTags[i] !== undefined && temTags[i] !== null && temTags[i] !==""){
			newTags.push(temTags[i]);
		}
	}
	$scope.jobDetails.companyId=$scope.companyId;
	$scope.jobDetails.jobTittle=$scope.Job.Tittle;
	$scope.jobDetails.jobDescription=$scope.Job.Description;
	//$scope.jobDetails.noOfVacancies=$scope.Job.noOfVacancies;
	$scope.jobDetails.Qualification=$scope.Job.Qualification;
	$scope.jobDetails.minSalary=$scope.Job.minSalary;
	$scope.jobDetails.maxSalary=$scope.Job.maxSalary;
	$scope.jobDetails.Location=$scope.Job.Location;
	$scope.jobDetails.Tags = newTags;
	$scope.jobDetails.createdDate=new Date();
	$scope.jobDetails.updatedDate=new Date();
	$scope.jobDetails.crmId=$scope.userRoleMappingId;
	$scope.jobDetails.urmId=$scope.userRoleMappingId;
	$scope.jobDetails.activeFlag=1;
	JobSrv.saveJob($scope);
};																						

}]);