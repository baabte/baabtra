(function() {

'use strict';

/**
 *author:anu
 *updated on:16.10.2014
 * @ngdoc function
 * @name baabtra.controller:LeftMenuCtrl
 * @description
 * # LeftMenuCtrl
 * Controller of the baabtra
 */
            angular.module('baabtra')
              .controller('LeftMenuCtrl',['$scope','Leftmenuservice', function ($scope,Leftmenuservice) {
                var outcome;
                $scope.result = Leftmenuservice.FnShowleftmenu($scope);  //function FnShowleftmenu returns the JSON object containing menus
                //sample values that will be updated while doing binding with services
                $scope.FnShowSubMenus=function (menus,count){   // function FnShowSubMenus is used to display the submenus on clicking its parent menu
                     $scope.submenu=null;   //variable that stores the submenu of the parent menu selected
                     $scope.activeMenu=null; //variable that stores the active menu
                     if(menus.childMenuStructure.length>0 && count%2!==0){   //the count variable is used to take the count of click
                        $scope.subleftmenu={'display':'block'}; //if it is an odd click, and if there exist a child structure then the style of submeu tag will be set to block display
                        $scope.activeMenu=menus;
                        $scope.submenu=menus.childMenuStructure;
                        outcome='success';
                     }
                     else {
                        $scope.subleftmenu={'display':'none'};
                        outcome='fail';
                        }
                        count=count+1;
                    };
            }]);
})();