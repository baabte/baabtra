angular.module('baabtra').directive('batchLoader',['addBatches','$rootScope','$filter', function (addBatches,$rootScope,$filter) {
	return {
		restrict: 'E',
    require:'ngModel',
		scope:{
			ngModel:"=",
			courseobj:"="
		},
		templateUrl: 'angularModules/Batches/directives/Directive-batchLoader.html',
		link: function(scope, element, attrs, fn) {	
   // scope.$watch('courseobj', function(){//adding watch to couse id 
   //    $scope.courseId=scope.courseobj.course._id
   //      if(!angular.equals(scope.courseobj.doj,undefined)){
   //        $scope.joinDate=scope.courseobj.doj 
   //      }
   //   }, true); 
  
			var companyId = "54978cc57525614f6e3e710b";    
			if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId){
			  companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
        		
			}
       var courseId;
       var courseType;
       var join=new Date();
       var joinDate="";
   //function for loading Batches
   //console.log(scope.coursedata);
  // var joinDate="2015-03-15T18:30:00.000Z";
   //coursedata='54fc31f443fa1fe885d3ad61';
   // scope.$watch('coursedoj', function(){//adding watch to couse id 
   //         if(!angular.equals(scope.coursedoj,undefined)){
   //            joinDate=scope.coursedoj.toISOString(); 
   //          }else{
   //             joinDate="2015-03-15T18:30:00.000Z";//Date();
              
   //          }
   //      }, true);

	scope.$watch('courseobj', function(){//adding watch to couse id
   if (typeof scope.courseobj.referredBy == "undefined") { 
         if(!angular.equals(scope.courseobj.course,undefined)){
           courseId=scope.courseobj.course._id;
         } 
         if(!angular.equals(scope.courseobj.doj,undefined)){
              joinDate=scope.courseobj.doj.toISOString(); 

            }else{
                joinDate=join.toISOString(); 
            } 
        courseType = scope.courseobj.coursetype;
       scope.batchElements=[];
       if(!angular.equals(courseId,undefined)){
           var promise = addBatches.loadCourseRelatedBatches(companyId,courseId,joinDate,courseType)
        promise.then(function(response){
          //  console.log(angular.fromJson(JSON.parse(response.data)));
          scope.batchElements = angular.fromJson(JSON.parse(response.data));
           angular.forEach(scope.batchElements, function(batch){
          //  //console.log(batch);
          //consoel.log(batch.batchName);
            batch.Name = batch.batchName;
            batch._id = batch._id.$oid;
            batch.startDate=batch.startDate.$date;
          if(batch.batchMode=="onetime"){
           batch.icon = '<div class="col-xs-12  text-xs">Starts on: '+$filter('date')(batch.startDate)+'<br/>Remaining seats:'+batch.seats+'<br/>Duration:'+batch.duration+'days</div>';
           }else{
            batch.icon = '<div class="col-xs-12  text-xs">Starts on: '+$filter('date')(batch.startDate)+'<br/>Remaining seats:'+batch.seats+'<br/>Duration:'+batch.repeats.repeatsAfter+'days</div>';
            }
           })

         // console.log(scope.batchElements );
          
        }); 
     } 
    }       
   }, true); 
  

           

         	 
       
    
 	   // }, true);   
	  }	
	}
}]);
