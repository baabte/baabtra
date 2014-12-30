angular.module('baabtra').controller('ListjobsCtrl',['$scope','JobSrv','$modal',function ($scope,JobSrv,$modal){

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
$scope.activeLink=1;
var CurNewValue="";

JobSrv.listJobs($scope,$scope.companyId,"","");

$scope.$watch('modelSearch', function (newValue, oldValue) {//function which watces the change in text box and used  for searching companies and roles
      if(!angular.equals(newValue,undefined)){
		CurNewValue=newValue;
		JobSrv.listJobs($scope,$scope.companyId,CurNewValue,"");
      }
  });

$scope.next_one = function() {//To get Next page
	if ($scope.JobCount>12) {
        $scope.activeLink=$scope.activeLink+12;
        JobSrv.listJobs($scope,$scope.companyId,CurNewValue,$scope.activeLink-1);
        }
    };
    $scope.prev_one = function() {//To get Previous page
	if($scope.activeLink>12)
		{
			$scope.activeLink=$scope.activeLink-12;
			JobSrv.listJobs($scope,$scope.companyId,CurNewValue,$scope.activeLink);
		}
    };
$scope.ViewJobDetails=function(Job)
{
	$scope.JobDetails=Job;
	var myOtherModal = $modal({scope: $scope, template: 'angularModules/company/partials/Partial-viewJobDetailsModal.html', show: true});
};

$scope.editJobDetails=function(Job)
{
	$scope.EditJobDetails=Job;
	console.log($scope);
	var myOtherModal = $modal({scope: $scope, template: 'angularModules/company/partials/Partial-editJobDetailsModal.html', show: true});
};
$scope.hideJobDetails=function(job_id,flag)
{
//alert(job_id);
var jobStaus=flag?0:1;
//alert(jobStaus);
JobSrv.hideJobDetails(job_id,jobStaus);
};
}]);