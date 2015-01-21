angular.module('baabtra')

// .directive("ngFileSelect",['fileReader','$rootScope',function(fileReader, $rootScope){  //directive for file onload preview

//  return {
//    scope:true,
//    link: function($scope,el,attr,ctrls){   



//      //console.log(ctrls);
//      el.bind("change", function(e){     

//        $scope.file = (e.srcElement || e.target).files[0];
//        $rootScope.valid = true;
//        $scope.validateFile();

//        if ($rootScope.valid) {
//           $scope.getFile();
//           $rootScope.errTooltip = "Please choose an image to be shown for the course";  
//               el.removeClass('bg-danger lt');     
//        }
//        else{   

//        }       
//      });

//      $scope.getFile = function () {
      
//        fileReader.readAsDataUrl($scope.file, $scope)
//                      .then(function(result) {                     
//                          $scope.$parent.imageSrc = result;       
//         });
//      };
//    }
   
//  };
 
 
// }])

//directive to validate the max size of the file
.directive('fMaxSize', ['$parse','fileReader', function($parse, fileReader) {
	return {
		restrict: 'A',
		require: ["^?form",'ngModel'],
		link: function(scope, elem, attrs, ctrls) {

		// binding the change function to the control
		elem.bind("change", function(e){ 


		       scope.file = (e.srcElement || e.target).files[0];		      
		       if(scope.validateFile()) {
		       	scope.getFile();
		       	scope.title = '';
		       	elem.removeClass('bg-danger lt');
		       }

		             
		});

				// To validate the file attributes
			     scope.validateFile = function () {     

						// file size
					      if ((scope.file.size) > parseInt(attrs.fMaxSize)*1024) { 

					      	console.log(ctrls[1]);
					  
					      	  ctrls[1].$invalid = true;	      	  
					      	  
					      	  scope.title = 'This exceeds the maximum file size limit of ' + attrs.fMaxSize + 'Kb';
					      	 
					          elem.addClass('bg-danger lt'); 
					          scope.$parent.imageSrc = '';

					          return false;             
					       }
					       else{
					       	  return true;
					       }       

			    };

			    //To show the added image
			    scope.getFile = function () {
		      
				       fileReader.readAsDataUrl(scope.file, scope)
				                     .then(function(result) {                     
				                         scope.$parent.imageSrc = result;       
				        });

		        };

		} //.End link
	  
	}//. End return

}]); // .End directive('fMaxSIze'