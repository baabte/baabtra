angular.module('baabtra').directive('checkUserExistence',['companyRegistrationService','$alert', function (companyRegistrationService,$alert) {
	return {
		restrict: 'A',
		require :["^?form",'ngModel'],
		scope:{checkMode:"=",outObject:"=",newUser:"="},
		link: function(scope, element, attrs, ctrls) {
			// console.log(ctrls);
			 
			 

			scope.$watch(function (){return ctrls[1].$modelValue;/* define what to watch*/
				}, function(){

					//if the required attribute is set to true the color will change to red
						if(ctrls[1].$valid){
							// console.log(ctrls[1].$modelValue);

							var userValObj={eMail:$(element).val(),fetch:attrs.checkMode};
							var fnUserNameValidCallBack= companyRegistrationService.fnUserNameValid(userValObj);

								fnUserNameValidCallBack.then(function(data){

							var result=angular.fromJson(JSON.parse(data.data));
							// console.log(result);
 							if(result.userCheck===1){
 								console.log(ctrls[1]);  
       						scope.notifications('!','Already a user!','info');
       						result.UserDetails.profile._id=result.UserDetails._id.$oid;

       						for(var key in result.UserDetails.profile){
       							scope.outObject[key]=result.UserDetails.profile[key];
       						}
       						scope.newUser=false;

       						 ctrls[1].$setValidity("checkUserExistence", true);
            				}
 							else if(result.userCheck===0){ 
 								console.log(ctrls[1]);
 								for(var key in scope.outObject){
  									if(angular.equals(key,'eMail')){}
  									else if(angular.equals(key,'password')){
  										delete scope.outObject.password;
  									}	
  									else{
  										scope.outObject[key]='';
  									}
  								}
  							scope.newUser=true;
            				}

							});

						
										
						}

				});	
			

			

	scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };



		}
	};




}]);