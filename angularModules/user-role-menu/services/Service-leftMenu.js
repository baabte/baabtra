(function() {

  'use strict';

/**
 * @ngdoc service
 * @name baabtra.Leftmenuservice
 * @description
 * # Leftmenuservice
 * Service in the baabtra.
 */
      angular.module('baabtra')
        .service('Leftmenuservice', function Leftmenuservice($http) {
          // AngularJS will instantiate a singleton by calling "new" on this function
          this.FnShowleftmenu=function ($scope){
            var result;
            $http({
                 url: bb_config.BWS+'GetMenuItems/',
                 data: JSON.stringify({'fkUserRoleMappingId':'543cf5ff13f91ab3c3d8e136'}), //condition for filtering data for loading menu
                // data: {'fkUserRoleMappingId':JSON.stringify(id)},
                 method: 'Post',
                 withCredentials: false,
                 contentType:'application/json',
                 dataType:'json',
                 }).
                    success(function(data, status, headers, config) {
                    $scope.menulist=angular.fromJson(JSON.parse(data)); //returns the json object containing menu
                    //console.log(data);
                    result="success";
                 }).
                    error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                     // or server returns response with an error status.
                     result="fail";
                 });  
                  //return result;
          };
         
       });
})();       