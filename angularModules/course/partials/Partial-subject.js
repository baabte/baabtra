angular.module('baabtra').controller('SubjectCtrl',['$scope', '$rootScope', '$state', '$alert', 'commonService', 'viewCourse', function($scope, $rootScope, $state, $alert, commonService, viewCourse){

	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty = false;
		return;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/

	$scope.subjectObj = {};
	$scope.subjectObj.newSubject = {};
	$scope.subjectObj.newSubject.status = true;
	$scope.subjectObj.newSubject.activeFlag = 1;
	$scope.subjectObj.mode = $state.params.key;
	$scope.subjectObj.exists = false;
	$scope.subjectObj.errorMsg = [];

	if(angular.equals($scope.subjectObj.mode, 'view')){
		var subjectCondition = {companyId:companyId, activeFlag:1};
		var loadSubject = viewCourse.loadSubject(subjectCondition);
		loadSubject.then(function(response){
			var result = angular.fromJson(JSON.parse(response.data));
			$scope.subjectObj.subjectList = result;
		});
	}
	else if(angular.equals($scope.subjectObj.mode, 'update')){
		
		var subjectCondition = {companyId:companyId, activeFlag:1,_id:$state.params._id};
		var loadSubject = viewCourse.loadSubject(subjectCondition);
		loadSubject.then(function(response){
			var result = angular.fromJson(JSON.parse(response.data));
			$scope.subjectObj.newSubject = result;
		});
	}

	$scope.saveSubject = function(subject, callback){
		if($scope.subjectObj.errorMsg.length){
			subject.companyId = companyId;
			subject.crmId = subject.crmId?subject.crmId.$oid:rm_id;
			subject.urmId = subject.urmId?subject.urmId.$oid:rm_id;
			if(subject._id){
				subject._id = subject._id.$oid;
			}
			var saveSubject = viewCourse.saveSubject(subject);
			saveSubject.then(function(response){
				var result = angular.fromJson(JSON.parse(response.data));

				if(callback){
					callback();
				}
				else{
					$scope.subjectObj.newSubject = result.subject;
					$alert({title: result.type+"!", content: "Subject "+result.type+" Successfully", placement: 'top-right',duration:2, type: "success"});
				}
			});
		}	
	};

	$scope.deleteSubject = function(subject, index){
		
		subject.activeFlag = 0;
		$scope.saveSubject(subject,function(){
			$scope.subjectObj.subjectList.splice(index, 1);
			$alert({title: "Deleted!", content: "Subject Deleted Successfully", placement: 'top-right',duration:2, type: "success"});
		});
	};


	$scope.checkExists = function(label, key, value){

		var data = {collectionName:'clnSubjects'};
			data.condition = {companyId:companyId, activeFlag:1};
			data.condition[key] = value;
			data.objectIds = ['companyId'];

		if(value){
			var valueExists = commonService.valueExists(data);
				valueExists.then(function(response){
					var result = angular.fromJson(JSON.parse(response.data));
					var msg = label+ " Already Exists";
					if(!angular.equals(result.data, null)){
						if(!angular.equals(result.data._id.$oid, ($scope.subjectObj.newSubject._id?$scope.subjectObj.newSubject._id.$oid:""))){
							if(angular.equals($scope.subjectObj.errorMsg.indexOf(msg), -1)){
								$scope.subjectObj.errorMsg.push(msg);
							}
						}
						else{
							if(!angular.equals($scope.subjectObj.errorMsg.indexOf(msg), -1)){
								var index = $scope.subjectObj.errorMsg.indexOf(msg);
								$scope.subjectObj.errorMsg.splice(index, 1);
							}
						}	
					}
					else{
						if(!angular.equals($scope.subjectObj.errorMsg.indexOf(msg), -1)){
							var index = $scope.subjectObj.errorMsg.indexOf(msg);
							$scope.subjectObj.errorMsg.splice(index, 1);
						}
					}
				});
		}
	};


}]);