(function() {

    'use strict';

    /**
     * @ngdoc overview
     * @name app
     * @description
     * # app
     *
     * Main module of the application.
     */
    angular
      .module('baabtra', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ngStorage',
        'ui.router',
        'ui.utils',
        'mgcrea.ngStrap',
        'pascalprecht.translate',
        'oc.lazyLoad',
        'ui.load',
        'ui.jp',
        'angular-loading-bar',
        'LocalStorageModule',
        'ui.tree',
        'xtForm',
        'xeditable',
        'angularFileUpload',
        'uiRouterStyles',
        'schemaForm',
        'ui.select',
        'fg',
        'ui.bootstrap.contextMenu',
        'ngFacebook',
        'perfect_scrollbar',
        'googleplus',
        'ngLinkedIn',
        'perfect_scrollbar',
        'ngTagsInput',
        'ngQuill',
        'hierarchical-selector'

      ]).run(function(editableOptions) {
  editableOptions.theme = 'bs3';
})
      .directive("ngFileSelect",['fileReader',function(fileReader){  //directive for file onload preview

 return {
   //scope:true,
   link: function($scope,el,attr,ctrls){
     //console.log(ctrls);
     el.bind("change", function(e){
       $scope.file = (e.srcElement || e.target).files[0];
       $scope.valid = true;
       $scope.validateFile();

       if ($scope.valid) {
          $scope.getFile();
       }
       else{          
       }       
     });

// To validate the file attributes
     $scope.validateFile = function () {     

// file size
      if (($scope.file.size) > parseInt(attr.fMaxSize)*1024) {         
             
              $scope.errTooltip = 'This exceeds the maximum file size limit of ' + attr.fMaxSize + 'Kb';
              $scope.valid = false;
              el.addClass('bg-danger lt');              
       }

      };

     $scope.getFile = function () {
      
       fileReader.readAsDataUrl($scope.file, $scope)
                     .then(function(result) {                     
                         $scope.$parent.imageSrc = result;
               console.log($scope.$parent.imageSrc);         
        });
     };
   }
   
 };
 
 
}])
// Directive for validating file upload
      .directive('checkFileSize',function(){        
    return{
        scope:true,
        link: function(scope, elem, attr, ctrl) {
            $(elem).bind('change', function() {
            
            console.log('before:' + scope.acGenInfo.courseImg.$invalid);
              //checking the filesize              
            
          });

        }
    }
});


}());

