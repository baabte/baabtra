angular.module('baabtra').controller('HomeCtrl',['$browser','$rootScope','$state','$scope','$localStorage','localStorageService','home','$dropdown','commonService','$modal','addCourseService','bbConfig','commonSrv',function ($browser,$rootScope,$state,$scope,$localStorage,localStorageService,home,$dropdown,commonService,$modal,addCourseService,bbConfig,commonSrv){

// Global variables for validating fileupload control
$rootScope.valid=true;
$rootScope.errTooltip = "Please choose an image to be shown for the course";
// End. Global variables for validating fileupload control


$rootScope.$watch('userinfo',function(){
  if($rootScope.userinfo){
    $scope.rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.userinfo = $rootScope.userinfo;
    if(angular.equals($rootScope.userinfo.ActiveUserData.roleMappingObj.avatar,undefined)){
      $rootScope.userinfo.ActiveUserData.roleMappingObj.avatar = '';
    }
    
    home.FnLoadMenus($scope);//Load Menus for logged user
}
else{
    $rootScope.hide_when_root_empty=true;
    commonService.GetUserCredentials($scope);
    if($rootScope.userinfo){$scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    home.FnLoadMenus($scope);
  }
    
}
if($rootScope.loggedIn==false){
  $state.go('login');
}

});

 $scope.avatarSource = '';
 var existingAvatar = '';
  $scope.handleFileSelect=function(evt) {
          $scope.undo=false;
          var file=evt.context.files[0];

          var reader = new FileReader();
          reader.onload = function (evt) {
            $scope.$apply(function($scope){
              $scope.avatarSource=evt.target.result;
            });
          };
          reader.readAsDataURL(file);
  };

$scope.changeProfilePic = function(avatarImg){
      commonSrv.fnUploadProfilePic(avatarImg, $scope.rm_id);
};

$scope.cancelChangeProfilePic = function(){
  $rootScope.userinfo.ActiveUserData.roleMappingObj.avatar = existingAvatar;
}

$scope.removeAvatar =function(elem){
  $rootScope.userinfo.ActiveUserData.roleMappingObj.avatar = "";
  existingAvatar = "";
   commonSrv.fnUploadProfilePic("", $scope.rm_id);
   //$scope.undo=true;
};

$scope.undoRemoveAvatar = function(){
  $rootScope.userinfo.ActiveUserData.roleMappingObj.avatar = existingAvatar;
  existingAvatar = "";
  commonSrv.fnUploadProfilePic(existingAvatar, $scope.rm_id);
};
var modelPop = '';

$rootScope.manageProfile =function(){
    existingAvatar = angular.copy($rootScope.userinfo.ActiveUserData.roleMappingObj.avatar);
modelPop= $modal({scope: $scope, template: 'angularModules/login/partials/Popup-userDetails.html', placement:"center", show: true});
 };



$scope.genRandomNumbers=function(){
  return Math.floor(Math.random()*10,1);
};
$scope.colorArray=['btn-danger','btn-inbox-green','btn-inbox-orange','btn-baabtra-blue','btn-inbox-bluee','btn-success','btn-inbox-blue','btn-info','btn-warning','btn-inbox-inverse','btn-inbox-red']

$scope.$watch('userMenusOrigin',function(){
  if (!angular.equals($scope.userMenusOrigin,undefined)) {
    $localStorage.linkPath=[];
      $scope.linkPath=$localStorage.linkPath;
    $rootScope.menuExist=false;
    getMenuByLink($scope.userMenusOrigin,null,null,$state.current.name);
     if(!$rootScope.menuExist){
      $state.go('home.main');
     }
  }
});

$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
  if($rootScope.userinfo)
   {
    $rootScope.menuExist=false;
       getMenuByLink($scope.userMenusOrigin,null,null,toState.name);
       if (!$rootScope.menuExist && !angular.equals(toState.name,'home.main')) {
         event.preventDefault();
       }
     }
});

    $scope.loadDetails =function(menu){
      $scope.navBar=true;
      if (angular.equals($localStorage.linkPath,undefined)) {
        $localStorage.linkPath=[];
      }
      $localStorage.linkPath.push(menu);
      $scope.linkPath=$localStorage.linkPath;
      if (menu.childMenuStructure.length) {
        $scope.userMenus=menu.childMenuStructure;
      }
      else if(menu.actions){
        $state.go(menu.actions[0].stateName);
      }
    };

    $scope.goHome = function(){//when click home button this function triggers
      $localStorage.linkPath=[];//link path set to null
      $scope.linkPath=$localStorage.linkPath;
      $scope.navBar=false;
      $scope.userMenus=$scope.userMenusOrigin;
      $state.go('home.main');
    };

    $scope.goMenu = function(menu,index){//for go to a particular menu when click the menu path
      var trim_val=$localStorage.linkPath.length-index-1;
      for (var link_index = 0; link_index < trim_val; link_index++) {
        $localStorage.linkPath.pop();
      }
      if (!angular.equals(menu.actions,undefined)) {
        $state.go(menu.actions[0].stateName);//go to the curresponding state when click a link
      }
      else {
        $scope.userMenus=menu.childMenuStructure;
        $state.go('home.main');
      }
    };


  function getMenuByLink(menu,sub,path_obj,state){
    if (sub==null) {
      sub=0;
    }
    if(!angular.equals(menu[sub],undefined)){
      getMenuByLink(menu,sub+1,path_obj,state);
      if(menu[sub].childMenuStructure.length){
        if(path_obj==null){
          path_obj=[];
        }
          if(!angular.equals(menu[sub].fkMenuId,undefined)){
            path_obj.push(menu[sub]);
          }
          else{
              path_obj.push(menu[sub]);
          }
          getMenuByLink(menu[sub].childMenuStructure,null,path_obj,state);
        }
        else{
          if(path_obj==null){
            path_obj=[];
          }
          angular.forEach(menu[sub].actions,function(action){
            if (angular.equals(action.stateName,state)) {
              $rootScope.menuExist=true;
              path_obj.push(menu[sub]);
              $scope.navBar=true;
              $localStorage.linkPath=path_obj;
              $scope.linkPath=$localStorage.linkPath;
            }
          });
        }
      }
    }

    // setting a watch for enabling the perfect scrol on exceeding the length of breadcrumb 
    $scope.$watch('linkPath',function(){
      var containerWidth=$('.breadCrumb').width();
      var bcWidth=1;
      $('.nav-container-scroll li').each(function(){
        bcWidth+=$(this).width();
      });
      $scope.showScrollbarBreadcrumb=bcWidth>containerWidth;
    });

}]);