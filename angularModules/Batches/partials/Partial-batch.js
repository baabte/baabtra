angular.module('baabtra').controller('BatchCtrl', ['$scope', '$rootScope', '$state', '$alert', 'commonService', 'viewBatches', function($scope, $rootScope, $state, $alert, commonService, viewBatches){

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

	$scope.batchObj = {};
	$scope.batchObj.newBatch = {};
	$scope.batchObj.newBatch.academicYearName = '';
	$scope.batchObj.newBatch.batchCourseName = '';
	$scope.batchObj.newBatch.activeFlag = 1;
	$scope.batchObj.mode = $state.params.key;
	
	if(angular.equals($scope.batchObj.mode, 'view')){
		var batchCondition = {companyId:companyId, activeFlag:1};
		var loadClassRoomBatch = viewBatches.loadClassRoomBatch(batchCondition);
		loadClassRoomBatch.then(function(response){
			var result = angular.fromJson(JSON.parse(response.data));
			$scope.batchObj.batchList = result;
		});

	}
	else if(angular.equals($scope.batchObj.mode, 'update')){
		
		var courseCondition = {companyId:companyId, activeFlag:1,_id:$state.params._id};
		var loadClassRoomDetails = viewBatches.loadClassRoomBatch(courseCondition);
		loadClassRoomDetails.then(function(response){
			var result = angular.fromJson(JSON.parse(response.data));
			console.log(result);
			result.academicYear = result.academicYear.$oid;
			result.batchCourse = result.batchCourse.$oid;
			$scope.batchObj.newBatch = result;
		});
	}

	$scope.saveBatch = function(batch, callback){
		console.clear();
		batch.companyId = companyId;
		if(batch._id){
			batch._id = batch._id.$oid?batch._id.$oid:batch._id;
		}

		batch.crmId = batch.crmId?(batch.crmId.$oid?batch.crmId.$oid:batch.crmId):rm_id;
		batch.urmId = batch.urmId?(batch.urmId.$oid?batch.urmId.$oid:batch.urmId):rm_id;

		var saveBatch = viewBatches.saveBatch(batch);
		saveBatch.then(function(response){
			var result = angular.fromJson(JSON.parse(response.data));
			if(callback){
				callback();
			}
			else{
				result.batch.academicYear = result.batch.academicYear.$oid;
				result.batch.batchCourse = result.batch.batchCourse.$oid;
				$scope.batchObj.newBatch = result.batch;
				$alert({title: result.type+"!", content: "Course "+result.type+" Successfully", placement: 'top-right',duration:2, type: "success"});
			}
		});
	};//saveBatch - end

	$scope.deleteBatch = function(batch, index){
		batch.academicYear = batch.academicYear.$oid;
		batch.batchCourse = batch.batchCourse.$oid;
		batch.activeFlag = 0;
		$scope.saveBatch(batch,function(){
			$scope.batchObj.batchList.splice(index, 1);
			$alert({title: "Deleted!", content: "Batch Deleted Successfully", placement: 'top-right',duration:2, type: "success"});
		});
	};//deleteBatch - end

}]);