angular.module('baabtra').controller('ManagebatchesCtrl',['$scope','$modal','bbConfig','$rootScope','$http','$state','commonService','addBatches','$alert',function($scope,$modal,bbConfig,$rootScope,$http,$state,commonService,addBatches,$alert){
    if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
    }
    if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
    }
    $scope.Batch = {};
   // $scope.repeatName={};
    //$scope.Batch.oneTime={};
    $scope.Batch.repeats={};
    $scope.Batch.Admission={};$scope.Batch.repeats={};
    $scope.Batch.Admission={};
    $scope.Batch.repeats.excludedDaysRepeat=[];
    $scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.cmp_id=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
    $scope.fnLoadPopupRepeat=function(batchMode){
      if(angular.equals(batchMode,"repeat")){
           // $scope.Batch.oneTime={};
           $scope.Batch.repeats={};
           $scope.Batch.repeats.excludedDaysRepeat=[];
         $modal({scope: $scope, template: 'angularModules/Batches/partials/partial-popupRepeatBatch.html',
          show: true  
         });
      }else{
           $scope.Batch.repeats={};
           $scope.Batch.repeats.excludedDaysRepeat=[];
         // $modal({scope: $scope, template: 'angularModules/Batches/partials/partial-popuponeTimeBatch.html',
         // show: true
         //});
      }

      
    }
   $scope.repeatArrays=[{id:0,text:'Daily',totalDays:1},{id:1,text:'Weekly',totalDays:7},{id:2,text:'Monthly',totalDays:30},{id:3,text:'Yearly',totalDays:365}];  
   $scope.repeatEvery=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
   $scope.repeatTypeArray=[{id:0,text:'Days'},{id:1,text:'Weeks'},{id:2,text:'Months'},{id:3,text:'Years'}]
   $scope.days=[{id:'Sunday',text:'S'},{id:'Monday',text:'M'},{id:'Tuesday',text:'T'},{id:'Wednesday',text:'W'},{id:'Thursday',text:'Th'},{id:'Friday',text:'F'},{id:'Saturday',text:'S'}];
   $scope.fnLoadsubItem=function(id){
   	$scope.Batch.repeats.repeatType=$scope.repeatTypeArray[id].text;
    $scope.Batch.repeats.repeatTypeName=$scope.repeatArrays[id].text;
   // console.log($scope.Batch.repeats.repeatType);
    //console.log( $scope.Batch.repeats.repeatTypeName);
    //console.log($scope.repeatArrays[id].totalDays);
    $scope.totalDays=$scope.repeatArrays[id].totalDays;
   } 
   //$scope.saveRepeatfn=function(hide){
   // hide();
  // }
  // $scope.saveOnetimefn=function(hide){
  //  hide();
  // }
    $scope.savepopUpfn=function(hide){
    hide();
   }
   $scope.saveBatch=function(){//for saving the Batch
    $scope.Batch.crmId = $scope.rm_id;
    $scope.Batch.companyId =  $scope.cmp_id;
    $scope.Batch.urmId = $scope.rm_id;
    $scope.Batch.activeFlag=1;
    //console.log( $scope.Batch.startDate);
    $scope.Batch.startDate=$scope.Batch.startDate.toISOString();    
    $scope.Batch.endDate=$scope.Batch.endDate.toISOString();  
    $scope.Batch.createdDate = Date();
    $scope.Batch.updatedDate = Date();
    $scope.Batch.Admission.beforeDaysCount=0;
     $scope.Batch.Admission.afterDaysCount=0;
  if(angular.equals($scope.Batch.Admission.beforeType,'Days')){
    $scope.Batch.Admission.beforeDaysCount=1;
   }else if(angular.equals($scope.Batch.Admission.beforeType,'Months')){
    $scope.Batch.Admission.beforeDaysCount=30;
   }else if(angular.equals($scope.Batch.Admission.beforeType,'Weeks')){
    $scope.Batch.Admission.beforeDaysCount=7;
   }else{
    $scope.Batch.Admission.beforeDaysCount=365;
   } 

   $scope.Batch.Admission.beforeDaysCount=parseInt($scope.Batch.Admission.onBefore)*$scope.Batch.Admission.beforeDaysCount;
   if(angular.equals($scope.Batch.Admission.afterType,'Days')){
    $scope.Batch.Admission.afterDaysCount=1;
   }else if(angular.equals($scope.Batch.Admission.afterType,'Months')){
    $scope.Batch.Admission.afterDaysCount=30;
   }else if(angular.equals($scope.Batch.Admission.afterType,'Weeks')){
    $scope.Batch.Admission.afterDaysCount=7;
   }else{
    $scope.Batch.Admission.afterDaysCount=365;
   } 
   $scope.Batch.Admission.afterDaysCount=parseInt($scope.Batch.Admission.onAfter)*$scope.Batch.Admission.afterDaysCount;
      //var time=(new Date()).valueOf();
        // hashids = new Hashids("this is a batch id");
         // $scope.Batch.batchCode = hashids.encode(time);   
  
   $scope.fnExcludedDays=function(id){
       var idsel = $scope.Batch.repeats.excludedDaysRepeat.indexOf(id);
        // is currently selected
        if (idsel > -1) {
           $scope.Batch.repeats.excludedDaysRepeat.splice(idsel, 1);
        }else {// is newly selected
           $scope.Batch.repeats.excludedDaysRepeat.push(id);
        }
   }      
   var promise=addBatches.addNewBatches($scope.Batch)
   promise.then(function(response){
    if(response.data)
        $alert({title: 'Done..!', content: 'Successfuly added the Batch :-)', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'success', show: true});
         //$scope.Batch.oneTime={};
         
        // $scope.Batch.oneTime.excludedDaysOnetime=[];
         $scope.Batch.repeats.excludedDaysRepeat=[];
         //$scope.Batch.repeats={};
        // $scope.Batch.course={};
         //$scope.Batch.Admission={};
         //$scope.Batch.repeatName={};
         $scope.Batch.repeats={};
         $scope.Batch.Admission={};
         $scope.Batch = {};
         //$scope.newCourse={};
         
   });
   }

   //$scope.Batch.oneTime.excludedDaysOnetime=[];
   /*$scope.fnexcludeDaysOneTime=function(id){
    var idsel=$scope.Batch.oneTime.excludedDaysOnetime.indexOf(id);
     if(idsel>-1){
       $scope.Batch.oneTime.excludedDaysOnetime.splice(idsel, 1);
     }else{
       $scope.Batch.oneTime.excludedDaysOnetime.push(id);
     }    
   }*/
   //$scope.totalClicks=0;
  $scope.fnLoadBatches=function(){

      var promise=addBatches.loadBatches($scope.cmp_id)
      promise.then(function(response){
      $scope.batchEelements = angular.fromJson(JSON.parse(response.data));
       //$scope.totalClicks=$scope.totalClicks+1;

      });  
  } 
  $scope.fnCalcDays = function(num){
   $scope.Batch.repeats.repeatsAfter=parseInt(num)* parseInt($scope.totalDays);
  }
 
  
  $scope.fnEditBatches=function(id){
   console.log(id);
  }
  $scope.fnDeleteBatches=function(id){
   console.log(id);
  }
  $scope.fnLoadMoreOptions =function(id){
      $scope.batchId=id;
      var existingCourses= addBatches.loadExistingCoursesUnderBatch($scope.batchId)
        existingCourses.then(function(response){
        $scope.existingCourses=angular.fromJson(JSON.parse(response.data));
       
       });
      $modal({scope: $scope, template: 'angularModules/Batches/partials/partial-popUpOptions.html',
          show: true
         });
  }
  $scope.addCoursestoBatch=function(hide){//updating the batch details
     
     //console.log($scope.Batch.newCourse);
    $scope.existingCourses[0].course= $scope.existingCourses[0].course.concat($scope.Batch.newCourse);
    $scope.existingCourses[0]._id=  $scope.existingCourses[0]._id.$oid; 
    $scope.existingCourses[0].crmId=  $scope.existingCourses[0].crmId.$oid; 
    $scope.existingCourses[0].urmId=  $scope.existingCourses[0].urmId.$oid; 
    $scope.existingCourses[0].companyId=  $scope.existingCourses[0].companyId.$oid; 
    $scope.existingCourses[0].updatedDate=Date();
    delete $scope.Batch.newCourse;
   // console.log($scope.existingCourses);
    var addCourse=addBatches.addCoursesToBatch($scope.existingCourses);
    addCourse.then(function(response){
       $alert({title: 'Done..!', content: 'Successfuly updated the Batch :-)', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'success', show: true});
         hide();
    
    });
  }

  $scope.fnRemoveCourse=function(index){//fn for  remove the selected item 
    //var index = $scope.existingCourses[0].course.indexOf(id);
    $scope.existingCourses[0].course.splice(index, 1);
    //console.log($scope.existingCourses[0].course);
  }
  
}]);