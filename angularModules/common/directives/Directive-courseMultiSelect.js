angular.module('baabtra').directive('courseMultiSelect',['$rootScope','commonSrv', function($rootScope,commonSrv) {
	return {
		restrict: 'E',
		require:'ngModel',
		replace:true,
		scope: {
			ngModel : "=",
			courseId: "=",
			userId:"="
		},
		templateUrl: 'angularModules/common/directives/Directive-courseMultiSelect.html',
		link: function(scope, element, attrs, fn) {
			var companyId='';
			if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId){
				companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;				
			}
			scope.$watch('courseId',function(){
					var courseMaterialResponse = commonSrv.loadCourseMaterial(scope.courseId,scope.userId);
					courseMaterialResponse.then(function(response){
						scope.course = angular.fromJson(JSON.parse(response.data));
						//console.log(scope.course.courseTimeline)
						/*angular.forEach(usersUnderRoles, function(user){

							user.Name = user.profile.firstName + ' ' + user.profile.lastName;
							delete user.profile;
						});*/
						//scope.usersUnderRoles = angular.copy(usersUnderRoles);
						var summaryViewTypes = {0:{id: "1",name: "Year(s)",mFactor:(1/525600),show:true},
                        		1:{id: "2",name: "Month(s)",mFactor:(1/43200),show:true},
                        		2:{id: "3",name: "Week(s)",mFactor:(1/10080),show:true},
                        		3:{id: "4",name: "Day(s)",mFactor:(1/1440),show:true},
                        		4:{id: "5",name: "Hour(s)",mFactor:1/60,show:true},
                        		5:{id: "6",name: "Minute(s)",mFactor:1,show:true}};
                       	scope.summaryViewIn = summaryViewTypes[scope.course.selectedDuration-1]; //getting the selected duration
						scope.summaryDetails = [];	
						angular.forEach(scope.course.courseTimeline, function(elements, key){
							console.log(key);
							if(angular.equals(scope.summaryDetails[Math.ceil(key*scope.summaryViewIn.mFactor)],undefined)){
								//scope.summaryDetails[Math.ceil(key*scope.summaryViewIn.mFactor)] = [];
							}
							angular.forEach(elements, function(element){
								if(angular.equals(typeof element,"object")){
									angular.forEach(element, function(elem){
										if(!angular.equals(elem.Name,"Payment_checkpoint")){
											scope.summaryDetails.push({code:elem.code, Name:elem.elements[0].value,elem:elem,courseElem:elements,key:key}); //[Math.ceil(key*scope.summaryViewIn.mFactor)]
										
										}
									})
								}
							});
						});
						
					}); //promise ends
			}); //watch end


		}
	};
}]);
