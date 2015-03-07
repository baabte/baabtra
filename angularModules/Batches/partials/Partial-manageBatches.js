angular.module('baabtra').controller('ManagebatchesCtrl',['$scope','$modal',function($scope,$modal){
 
    $scope.fnLoadPopupRepeat=function(mode){
     //console.log(mode)
     $modal({scope: $scope, template: 'angularModules/Batches/partials/partial-popupRepeatBatch.html',
      show: true
     });
     
    }
   $scope.repeatArrays=[{id:0,text:'Daily'},{id:1,text:'Weekly'},{id:2,text:'Monthly'},{id:3,text:'Yearly'}];  
   $scope.repeatEvery=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
   $scope.repeatTypeArray=[{id:0,text:'Days'},{id:1,text:'Weeks'},{id:2,text:'Months'},{id:3,text:'Years'}]
   $scope.days=[{id:'Sunday',text:'S'},{id:'Monday',text:'M'},{id:'Tuesday',text:'T'},{id:'Wednesday',text:'W'},{id:'Thursday',text:'Th'},{id:'Friday',text:'F'},{id:'Saturday',text:'S'}];
   $scope.fnLoadsubItem=function(id){
   	console.log(id);
   	$scope.repeatType=$scope.repeatTypeArray[id].text;
   } 
   $scope.saveRepeatfn=function(){
   	console.log($scope.Batch);
   }

}]);