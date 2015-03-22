angular.module('baabtra').controller('GlobalsettingsCtrl',['$scope','$stateParams','$rootScope','manageCompanyRoleService','globalSettings','$alert',function($scope,$stateParams,$rootScope,manageCompanyRoleService,globalSettings,$alert){

$scope.selectedTab="SetEvaluator";
$scope.entities=[];
$scope.incrementTypes=[{"Name":"<i class='fa fa-sort-numeric-asc p-xs'></i>Number","value":"Number"},{"Name":"<i class='ti-uppercase p-xs'></i>Alphabetics(In Capital Letter)","value":"Alphabetics(C)"},{"Name":"<i class='ti-smallcap p-xs'></i>Alphabetics(In Small Letter)","value":"Alphabetics(s)"}];
$scope.$watch(function() {
  return $rootScope.userinfo;
}, function() {

  $scope.userinfo = $rootScope.userinfo;
  companyId=$scope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  var existingConf= globalSettings.retrieveExistingConf(companyId);
	existingConf.then(function  (data) {

	  existingConfCallBack=angular.fromJson(JSON.parse(data.data));
	  $scope.roles=existingConfCallBack.CompanyRoles;
	  var roleslist=existingConfCallBack.CompanyRoles;
	  $scope.selectedEvalRoles=[];
	  if(existingConfCallBack.existingConf){
	  		existingEvalroles=existingConfCallBack.existingConf.evalRoles;
	  		$scope.existingItemAndCodes=existingConfCallBack.existingConf.itemCodes;
	  }
	  else{
	  		existingEvalroles=null;
	  		$scope.existingItemAndCodes=null;
	  }
	  $scope.roleslist=[];
	  if(existingEvalroles){
	  		for (var i = $scope.roles.length - 1; i >= 0; i--) {
			  var key = $scope.roles[i];
			  if (-1 === existingEvalroles.indexOf(key._id.$oid)) {
			    $scope.roleslist.push({"Name":key.roleName,"value":key._id.$oid}); //populate rest of the roles for evaluate drop down
			  }
			}
			
			for(var index=0;index<existingEvalroles.length;index++){
				for(var index2=0;index2<$scope.roles.length;index2++){
					if(existingEvalroles[index]==$scope.roles[index2]._id.$oid){
						$scope.selectedEvalRoles.push({"Name":$scope.roles[index2].roleName,"value":$scope.roles[index2]._id.$oid});
					}
				}
			}

	  }
	  else{
	  	 for(var roleindex=0;roleindex<roleslist.length;roleindex++){
	  			$scope.roleslist.push({"Name":roleslist[roleindex].roleName,"value":roleslist[roleindex]._id.$oid});//create items for evaluator drop down in case no one selected yet
	  	}

	  }
	  $scope.roles.push({"roleName":"Branches","_id":{"$oid":"Branches"}},{"roleName":"Department","_id":{"$oid":"Department"}},{"roleName":"Mentee","_id":{"$oid":"Mentee"}});
	  if(existingConfCallBack.existingConf){
	  	existingItemsObjArray=existingConfCallBack.existingConf.itemCodes;
	  }
	  else{
	  	existingItemsObjArray=null;
	  }
	  // create content for items
	  if(existingItemsObjArray){

	  		var existingItems=[];
	  		for(var counter=0;counter<existingItemsObjArray.length;counter++){
	  			for(var secCounter=0;secCounter<existingItemsObjArray[counter].items.length;secCounter++){
	  					existingItems.push(existingItemsObjArray[counter].items[secCounter]);
	  			}
	  		}
			for (var i = $scope.roles.length - 1; i >= 0; i--) {
			  var key = $scope.roles[i];
			  if (-1 === existingItems.indexOf(key._id.$oid)) {
			    $scope.entities.push({"Name":key.roleName,"value":key._id.$oid});
			  }
			}
	  }else{

	  		 for(var i=0;i<$scope.roles.length;i++){
				 $scope.entities.push({"Name":$scope.roles[i].roleName,"value":$scope.roles[i]._id.$oid});  		
	  			}
	  }


	  $scope.getItemByNameByValue=function(item){
	  	for(var index=0;index<$scope.roles.length;index++){
	  		if(item==$scope.roles[index]._id.$oid){
	  			return $scope.roles[index].roleName;
	  		}
	  	}
	  }
	 
	});

}, true);

$scope.setEvaluator=function(){
	var selectedroles=[];
	for(var index=0;index<$scope.selectedrole.length;index++){
		selectedroles.push($scope.selectedrole[index].value);
	}

	var data={}; 
	data.companyId=companyId;
	data.userLoginId=$scope.userinfo.userLoginId;
	data.evalRoles=selectedroles;
	for(var index=0;index<selectedroles.length;index++){
			for(var index2=0;index2<$scope.roleslist.length;index2++){
				if(selectedroles[index]==$scope.roleslist[index2].value){
					$scope.roleslist.splice(index2,1);
					
				}
			}
	}
	for(var index=0;index<$scope.selectedrole.length;index++)
	{
		$scope.selectedEvalRoles.push($scope.selectedrole[index]);
	}
	var addEvalRolesCallback= globalSettings.addEvaluator(data);
	addEvalRolesCallback.then(function  (data) {
	  if(data.status==200&&data.statusText=="OK"){
					$scope.notifications("Success","Evaluator Added","success");
					selectedroles=[];
			}
	});
};
				
$scope.Range = function(start, end) {
    var result = [];
    for (var i = start; i <= end; i++) {
        result.push(i);
    }

    return result;
};

$scope.getIncrementalCode=function(n, type) {
	if(!n){
		n=1;
	}
	if(type[0].value){
		type=type[0].value;
	}
	

if (angular.equals(type,"Number")){
return n;
}

		var x = n-1,
           r26 = x.toString(26),
           baseCharCode = "A".charCodeAt(0);

       var arr = r26.split(''),
           len = arr.length;

       var newArr =arr.map(function(val,i){
           val = parseInt(val,26);

           if( (i === 0) && ( len > 1)){
               val = val-1;
           }

           return String.fromCharCode(baseCharCode + val);
       });


      if (angular.equals(type,"Alphabetics(s)")){
			return angular.lowercase(newArr.join(''));
	  }

       return newArr.join('');

};
$scope.GenerateCode=function(){
		var codePattern={};
		var entities=[];

		$scope.selectedEntity.forEach(function(entity) {
		    entities.push(entity.value);
		});
		if($scope.statrange){
			codePattern.startRange=$scope.statrange;
		}
		codePattern.items=entities;
		codePattern.prefix=$scope.prefix;
		codePattern.IncPattern=$scope.selectedPattern[0].value;
		codePattern.companyId=companyId;
		for(var index=0;index<entities.length;index++){
			for(var index2=0;index2<$scope.entities.length;index2++){
				if(entities[index]==$scope.entities[index2].value){
					$scope.entities.splice(index2,1);
				}
			}
		}
		$scope.FormCodeGenerator.$setPristine();
		$scope.selectedEntity=[];
		$scope.prefix="";
		$scope.selectedPattern=[];
		$scope.statrange="";
		var codePatternCallback= globalSettings.GenerateCode(codePattern);
			codePatternCallback.then(function  (data) {
			  if(data.status==200&&data.statusText=="OK"){
							$scope.notifications("Success","Code Created","success");
					}
			});
};



$scope.removeExistingEvaluator=function(removeEvaluatorSelected,index){
	
	
	var dataToRemoveEvaluator={};
	dataToRemoveEvaluator.evaluator=removeEvaluatorSelected.value;
	dataToRemoveEvaluator.companyId=companyId;
	var removeExistingEvaluatorCallBack=globalSettings.removeExistingEvaluator(dataToRemoveEvaluator);
	removeExistingEvaluatorCallBack.then(function  (data) {
			  if(data.status==200&&data.statusText=="OK"){
							
			  				$scope.selectedEvalRoles.splice(index,1);
							$scope.roleslist.push({"Name":removeEvaluatorSelected.Name,"value":removeEvaluatorSelected.value});
							$scope.notifications("Success","Evaluator Removed","success");
					}
			});
}

// still incomplete in database side
$scope.removeItemFromAgroup=function(item){
	itemDataToRemove={};
	itemDataToRemove.companyId=companyId;
	itemDataToRemove.item=item;
	var removeItemFormAgroup=globalSettings.removeItemFromAgroup(itemDataToRemove);
	removeItemFormAgroup.then(function  (data) {
			  if(data.status==200&&data.statusText=="OK"){
							$scope.notifications("Success","Item Removed","success");
					}
			});

}	

$scope.updatePrefix=function(newPrefix){
	prefixDataToSend={};
	prefixDataToSend.companyId=companyId;
	prefixDataToSend.newPrefix=newPrefix;
	var prefixUpdateCallBack=globalSettings.updateExistingPrefix(prefixDataToSend);
	prefixUpdateCallBack.then(function  (data) {
			  if(data.status==200&&data.statusText=="OK"){
							$scope.notifications("Success","Prefix Updated","success");
					}
			});
}


$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };

}]);