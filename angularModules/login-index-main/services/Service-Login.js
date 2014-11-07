(function() {

  'use strict';
/*Created by : Suhail Pallimalil
*Created on : 10-10-14
*Description : Service js file for perform login 
*/
/**

 * @ngdoc service
 * @name baabtra.selogin
 * @description
 * # selogin
 * Service in the baabtra.
 */
 angular.module('baabtra')
 .service('Selogin', function Selogin($rootScope,$http,$window,$location,localStorageService) {
   this.Fnlogin=function(login_info,$scope)
   {
     $http({
      method: 'POST',
      url: bb_config.BWS+'Login/',
      data:login_info,           
    }).
     success(function(data, status, headers, config) 
     {
      //alert(JSON.parse(data));
      $scope.$watch('log_in', function () {
      localStorageService.add('log_in',JSON.parse(data));
      }, true);
      
      $scope.logged=angular.fromJson(JSON.parse(data));
      if ($scope.logged.result === "true") {
      $rootScope.login_check=1;
      $location.path("/home");
      }
      else
      {

      }
      }).
        error(function(data, status, headers, config) {
          });  
      };
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
})();
