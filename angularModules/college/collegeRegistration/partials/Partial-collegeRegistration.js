angular.module('baabtra').controller('CollegeregistrationCtrl',['$scope','commonService','$rootScope','$state','$modal','bbConfig','$alert','userRegistrationService','commonSrv','companyRegistrationService','collegeServices',function($scope,commonService,$rootScope,$state,$modal,bbConfig,$alert,userRegistrationService,commonSrv,companyRegistrationService,collegeServices){

/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	// var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	// var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	// var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login details ends*/

$rootScope.$watch('userinfo',function(){
    $scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	// $scope.roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	$scope.companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
    if(angular.equals($rootScope.userinfo.ActiveUserData.modernView,'classic')){
    	$scope.classic=true;
    }
});

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

//code to create new loader
// var loader=$modal({scope: $scope,backdrop:'static', template: 'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html', show: true,placement:'center'});
// loader.hide();

var globalValuesResponse = commonSrv.FnLoadGlobalValues("");
globalValuesResponse.then(function(data){
  var globalValues=angular.fromJson(JSON.parse(data.data));
  // console.log(globalValues);
  $scope.globalValues = {};
  angular.forEach(globalValues,function(value){
    $scope.globalValues[value._id] = value.values.approved;
  });
});


$scope.loadCourses = function(Query){

    return $scope.globalValues.courses;
};


$scope.college={};
$scope.college.role={};
$scope.college.role.roleId=bbConfig.CUSRID;
$scope.college.mandatoryData={};
$scope.college.mandatoryData.contactPersons=[{}];
$scope.college.mandatoryData.departments=[{}];
$scope.exsistingUser=true;


$scope.addContact= function(){

$scope.college.mandatoryData.contactPersons.push({});

};

$scope.removeContact= function(index){

$scope.college.mandatoryData.contactPersons.splice(index,1);

};

$scope.addDepartment= function(){

$scope.college.mandatoryData.departments.push({});

};

$scope.removeDepartment= function(index){

$scope.college.mandatoryData.departments.splice(index,1);

};

$scope.emailMsg='Not a valid email';          //error message for invalid email validation
$scope.emailEMsg='This Email Already exists'; //error message for email already exists validation 
$scope.existingEmail='';   


//funtion for email validation 
$scope.emailPattern = (function() {
    $scope.regexpEmail =/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return {
        test: function(value) {
            if( $scope.requireEmail === false ) {return true;}
            else {return $scope.regexpEmail.test(value);}
        }
    };

})();



var searchTimeOut;
$scope.userVal=function(){
  if(searchTimeOut) {
  clearTimeout(searchTimeOut);
  }
  searchTimeOut=setTimeout(function(){

     var userValObj=angular.copy($scope.college.mandatoryData);//object to fetch the user details
     // console.log(userNameId.eMail);
     userValObj.fetch='';//to fetch related details of the user pass '' to just user check
    // companyRegistrationService.fnUserNameValid(userNameId);
    var fnUserNameValidCallBack= companyRegistrationService.fnUserNameValid(userValObj);

    fnUserNameValidCallBack.then(function(data){

     var result=angular.fromJson(JSON.parse(data.data));

      if(result.userCheck===1){   //if the email id already registered
           $scope.existingEmail=$scope.college.mandatoryData.eMail; //setting the existing email id to scope variable for validation.
           $scope.notifications('Error!','UserName already in Use!','danger');
           $scope.exsistingUser=true;
          }
          if(result.userCheck===0){ //if not matching existing registered email
           $scope.notifications('','UserName Available!','info');

          $scope.exsistingUser=false;

         }

      });

  },500);
};



$scope.fnRegisterCollege= function(){
	$scope.college.loggedusercrmid=$scope.loggedusercrmid;
$scope.college.companyId=$scope.companyId;


	// console.log($scope.college);


	// code to create new loader
var loader=$modal({scope: $scope,backdrop:'static', template: 'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html', show: true,placement:'center'});
var FnRegisterCollegeCallBack=collegeServices.FnRegisterCollege($scope.college);

FnRegisterCollegeCallBack.then(function(data){
  var result=angular.fromJson(JSON.parse(data.data));
  // console.log(result);
loader.hide();

$scope.notifications('Yaay..!','Registered Successfully','success');   
      $state.go('home.main');
  // var  userEmail  = $rootScope.userinfo.ActiveUserData.eMail;
  // var  username   = $rootScope.userinfo.ActiveUserData.username;
  // var menteeEmail = $scope.college.mandatoryData.eMail;
  // var menteeName  = $scope.college.mandatoryData.collegeName;
  // var companyName = $rootScope.userinfo.ActiveUserData.username;
  // var companyLogo = $rootScope.userinfo.ActiveUserData.appSettings.logo;  
  // var sendNotification=userRegistrationService.fnSendEmailSmsNotification(userEmail,username,menteeEmail,menteeName,result.evaluatorEmailLIst,companyName,companyLogo);

});


};

$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };



}]);