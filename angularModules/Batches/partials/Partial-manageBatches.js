angular.module('baabtra').controller('ManagebatchesCtrl',['$scope','$modal','bbConfig','$rootScope','$http','$state','commonService','addBatches',function($scope,$modal,bbConfig,$rootScope,$http,$state,commonService,addBatches){
    if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
    }
    if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
    }
    $scope.Batch = {};
    $scope.Batch.oneTime={};
    $scope.Batch.repeats={};
    $scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.cmp_id=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
    $scope.Batch.crmId = $scope.rm_id;
    $scope.Batch.companyId =  $scope.cmp_id;
    $scope.Batch.urmId = $scope.rm_id;
    $scope.Batch.activeFlag=1;
    $scope.Batch.createdDate = Date();
    $scope.Batch.updatedDate = Date();
    $scope.fnLoadPopupRepeat=function(batchMode){
      if(angular.equals(batchMode,"repeat")){
            $scope.Batch.oneTime={};
         $modal({scope: $scope, template: 'angularModules/Batches/partials/partial-popupRepeatBatch.html',
          show: true
         });
      }else{
           $scope.Batch.repeats={};
          $modal({scope: $scope, template: 'angularModules/Batches/partials/partial-popuponeTimeBatch.html',
          show: true
         });
      }

      
    }
   $scope.repeatArrays=[{id:0,text:'Daily'},{id:1,text:'Weekly'},{id:2,text:'Monthly'},{id:3,text:'Yearly'}];  
   $scope.repeatEvery=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
   $scope.repeatTypeArray=[{id:0,text:'Days'},{id:1,text:'Weeks'},{id:2,text:'Months'},{id:3,text:'Years'}]
   $scope.days=[{id:'Sunday',text:'S'},{id:'Monday',text:'M'},{id:'Tuesday',text:'T'},{id:'Wednesday',text:'W'},{id:'Thursday',text:'Th'},{id:'Friday',text:'F'},{id:'Saturday',text:'S'}];
   $scope.fnLoadsubItem=function(id){
   	console.log(id);
   	$scope.Batch.repeats.repeatType=$scope.repeatTypeArray[id].text;
    $scope.Batch.repeats.repeatTypeName=$scope.repeatArrays[id].text;
   } 
   $scope.saveRepeatfn=function(hide){
    hide();
   }
   $scope.saveOnetimefn=function(hide){
    hide();
   }
   $scope.saveBatch=function(){//for saving the Batch
   var promise=addBatches.addNewBatches($scope.Batch)
   promise.then(function(response){
   console.log(response.data);
   });
   }
  $scope.Batch.repeats.excludedDaysRepeat=[];
   $scope.fnExcludedDays=function(id){
       var idsel = $scope.Batch.repeats.excludedDaysRepeat.indexOf(id);
        // is currently selected
        if (idsel > -1) {
           $scope.Batch.repeats.excludedDaysRepeat.splice(idsel, 1);
        }else {// is newly selected
           $scope.Batch.repeats.excludedDaysRepeat.push(id);
        }
   }
   $scope.Batch.oneTime.excludedDaysOnetime=[];

   $scope.fnexcludeDaysOneTime=function(id){
    var idsel=$scope.Batch.oneTime.excludedDaysOnetime.indexOf(id);
     if(idsel>-1){
       $scope.Batch.oneTime.excludedDaysOnetime.splice(idsel, 1);
     }else{
       $scope.Batch.oneTime.excludedDaysOnetime.push(id);
     }    
   }

   

}]);