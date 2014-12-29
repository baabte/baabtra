angular.module('baabtra').controller('ManageUserRoleCtrl',['$scope','manageCompanyRoleService','localStorageService','$location','$alert',function($scope,manageCompanyRoleService,localStorageService,$location,$alert){

  if (localStorageService.get('loginLsCheck')===2||localStorageService.get('loginLsCheck')===null) {
        $location.path('/login');//redirecting path into login
  }

	var loginInfo=localStorageService.get('loginInfo');
	$scope.companyId=loginInfo.userLoginId.$oid;
	var roleMappingObj=loginInfo.roleMappingObj;
	$scope.crmId=roleMappingObj[0].crmId;
    	$scope.urmId=roleMappingObj[0].urmId;
	$scope.btnRoleAdd='add';
	manageCompanyRoleService.RetrieveUserRole($scope);


$scope.AddCompanyRole=function(){
	// $scope.progress=true;
	$scope.btnRoleAdd='In progress';
	manageCompanyRoleService.addUserRole($scope);
};
 $scope.deleteRole=function(RollData,arrayindex_for_delete) //it wil edit roles from database
    {
       $scope.arrayindex_for_delete=arrayindex_for_delete;
       RollData._id=RollData._id.$oid;
       manageCompanyRoleService.DeleteCompanyRole($scope,RollData); // calling service function
    };
  $scope.updateUser=function(role,roleData,data) //it wil edit roles from database
    {
      
       $scope.roleData=roleData;
       $scope.role=role;
       $scope.data=data;
       manageCompanyRoleService.UpdateUserRole($scope);
    };
      


// call back functions
$scope.fnAddNewRollCallBack=function(data){ //callback function for handle Add new role of the company         
  data=angular.fromJson(JSON.parse(data));
  if(data=="success")
    {
      $scope.Form_Adding_form.$setPristine();
      $scope.roleName="";$scope.RoleDesc="";
      manageCompanyRoleService.RetrieveUserRole($scope);
    	$scope.notifications("Success","new role added","success");}
  else if (data=="error"||data=="failed") 
    {$scope.notifications('Warning!',"Failed to Create role","warning");} 
     $scope.btnRoleAdd='add';          
};

$scope.fnRertrivecompanyRoleCallBack=function(data){ //callback function for handle Edit role of the company         
 $scope.roles=angular.fromJson(JSON.parse(data));
 // console.log($scope.roles);
 if($scope.roles=="error"||$scope.roles=="failed"){
   // alert("Error in loading");
 } 
 else if($scope.roles.length<1) 
 {
  // alert("you have no roles");
}             
};
$scope.fnEditUserRoleCallBack=function(data){ //callback function for handle Edit role of the company         
 data=angular.fromJson(JSON.parse(data));
 if(data=="success")
  {
   $scope.notifications("success","Updated","success");}
   else if (data=="error"||data=="failed") 
     {$scope.notifications("Failed to Create role","warning");}           
 };
$scope.fnDeleteRoleCallBack=function(data){ //callback function for handle Edit role of the company         
 data=angular.fromJson(JSON.parse(data));
 if(data=="success")
 {
  $scope.roles.splice($scope.arrayindex_for_delete, 1);}
  else if (data=="error"||data=="failed") 
   {$scope.notifications("Failed to Create role","warning");}                        
};

//notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };

}]);



