angular.module('baabtra').directive('checkUserExistence',['companyRegistrationService','$alert', function (companyRegistrationService,$alert) {
	return {
		restrict: 'A',
		require :["^?form",'ngModel'],
		scope:{checkMode:"=",outObject:"="},
		link: function(scope, element, attrs, ctrls) {
			console.log(attrs.outObject);
			 
			 

			scope.$watch(function (){return ctrls[1].$modelValue;/* define what to watch*/
				}, function(){

					//if the required attribute is set to true the color will change to red
						if(ctrls[1].$valid){
							// console.log(ctrls[1].$modelValue);

							var userValObj={eMail:$(element).val(),fetch:attrs.checkMode};
							var fnUserNameValidCallBack= companyRegistrationService.fnUserNameValid(userValObj);

								fnUserNameValidCallBack.then(function(data){

							var result=angular.fromJson(JSON.parse(data.data));
							console.log(result);
 							if(result.userCheck===1){  
       						scope.notifications('!','Already a user!','info');
       						result.UserDetails.profile._id=result.UserDetails._id.$oid;
       						scope.outObject=result.UserDetails.profile;
       						console.log(scope.outObject);
            				}
 							else if(result.userCheck===0){ 
  							scope.outObject={};
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