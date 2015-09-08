angular.module('baabtra').controller('HomeCtrl',['socketFactory','$browser','$rootScope','$state','$scope','$localStorage','localStorageService','home','$dropdown','commonService','$modal','addCourseService','bbConfig','commonSrv','notification',function (socketFactory,$browser,$rootScope,$state,$scope,$localStorage,localStorageService,home,$dropdown,commonService,$modal,addCourseService,bbConfig,commonSrv,notification){

// Global variables for validating fileupload control
$rootScope.valid=true;
$rootScope.errTooltip = "Please choose an image for the course";
// End. Global variables for validating fileupload control

$scope.viewMenu = false;//for controll menu view in mobile

$rootScope.$watch('userinfo',function(){
  if($rootScope.userinfo){
    
    $scope.rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.userinfo = $rootScope.userinfo;


    if(angular.equals($rootScope.userinfo.ActiveUserData.modernView,undefined)){
      $rootScope.userinfo.ActiveUserData.modernView = "modern";
    }
    
    if(angular.equals($rootScope.userinfo.ActiveUserData.roleMappingObj.avatar,undefined)){
      $rootScope.userinfo.ActiveUserData.roleMappingObj.avatar = '';
    }
    
    if(angular.equals($scope.userMenus,undefined)){
      var response = home.FnLoadMenus($scope);//Load Menus for logged user
      response.then(function(data){

        $scope.userMenus = [];
        
        $scope.userMenus = $scope.userMenusOrigin = angular.fromJson(JSON.parse(data.data)).menuStructure[0].regionMenuStructure;
        
        // calling service for geting user notification
        var userNotificationResponse = notification.fnLoadUserNotification($scope.userinfo.userLoginId);
        userNotificationResponse.then(function(response){
          $rootScope.data = {};
          $rootScope.data.userNotification = angular.fromJson(JSON.parse(response.data));
          // if(!angular.equals($rootScope.data.userNotification,null)){
          //   $rootScope.data.userNotification.notification = $rootScope.data.userNotification.notifications;
          // }
        });

      });
    }
    
}
else{

    $rootScope.hide_when_root_empty=true;
    commonService.GetUserCredentials($scope);
    // commented by lijin on 17-4-2015
  //   if($rootScope.userinfo){$scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;

  //     home.FnLoadMenus($scope);
    
  // }
  
}

if(angular.equals($rootScope.loggedIn,false)){
  $state.go('login');
}

});

 $scope.avatarSource = '';
 var existingAvatar = '';
 $scope.btnName = "Change";
  $scope.handleFileSelect=function(evt) {

    if($scope.undo){
      $scope.undo=false;
      existingAvatar = '';
    }
          var file=evt.context.files[0];
          var reader = new FileReader();
          reader.onload = function (evt) {
            $scope.$apply(function($scope){
              $scope.avatarSource=evt.target.result;
            });
          };
          reader.readAsDataURL(file);
  };

$scope.changeProfilePic = function(avatarImg, $hide){
      $scope.btnName = "Uploading...";

      
      var response = commonSrv.fnUploadProfilePic(avatarImg, $rootScope.userinfo.ActiveUserData.userLoginId);
      response.then(function(data){
        $scope.btnName = "Change";
        $hide();
      });
};


$scope.cancelChangeProfilePic = function(){
  if(!$scope.undo){
    $scope.avatarSource = '';
    $rootScope.userinfo.ActiveUserData.roleMappingObj.avatar = existingAvatar;
  }
};


$scope.removeAvatar =function(elem){
  existingAvatar =  angular.copy($rootScope.userinfo.ActiveUserData.roleMappingObj.avatar);
  $rootScope.userinfo.ActiveUserData.roleMappingObj.avatar = "";
   commonSrv.fnUploadProfilePic("", $scope.rm_id);
   $scope.undo=true;
};


$scope.undoRemoveAvatar = function(){
  $rootScope.userinfo.ActiveUserData.roleMappingObj.avatar = existingAvatar;
  commonSrv.fnUploadProfilePic(existingAvatar, $scope.rm_id);
  $scope.undo=false;
};

$rootScope.manageProfile =function(){
  existingAvatar =  angular.copy($rootScope.userinfo.ActiveUserData.roleMappingObj.avatar);
  $modal({scope: $scope, backdrop:'static', template: 'angularModules/login/partials/Popup-userDetails.html', placement:"center", show: true});
 };



$scope.genRandomNumbers=function(){
  return Math.floor(Math.random()*10,1);
};
$scope.colorArray=['btn-danger','btn-inbox-green','btn-inbox-orange','btn-baabtra-blue','btn-inbox-bluee','btn-success','btn-inbox-blue','btn-info','btn-warning','btn-inbox-inverse','btn-inbox-red'];

$scope.$watch('userMenusOrigin',function(){
  if (!angular.equals($scope.userMenusOrigin,undefined)) {
   

    $localStorage.linkPath=[];
    $rootScope.linkPath = $localStorage.linkPath;
    $rootScope.menuExist=false;
    

    getMenuByLink($scope.userMenusOrigin,null,null,$state.current.name, function(){
      if(!$rootScope.menuExist){
      $state.go('home.main');
     }
    });
     
  }
});

$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 

  if($rootScope.userinfo)
   { 
    $rootScope.menuExist=false;
         if(angular.equals(toState.name,'home.main')){
          if(($localStorage.linkPath.length-1)){
            $rootScope.linkPath = $localStorage.linkPath.splice($localStorage.linkPath.length-1, 1);
            }
            else if(!($localStorage.linkPath.length-1)){
             // $rootScope.linkPath = $localStorage.linkPath.splice($localStorage.linkPath.length-1, 1);
             //$rootScope.linkPath = $localStorage.linkPath = [];
            }
          }
          if($scope.userMenusOrigin){
            getMenuByLink($scope.userMenusOrigin,null,null,toState.name, function(){
              if (!$rootScope.menuExist && !angular.equals(toState.name,'home.main')) {
                event.preventDefault();
              }
            });
          }
     }
});

    $scope.loadDetails =function(menu, event){


      if($scope.viewMenu){
        $scope.viewMenu = false;
      }
      
      $localStorage.currentMenuName=menu.MenuName;
      $localStorage.currentMenuLink=menu.MenuLink;

      $rootScope.navBar=true;
      if (angular.equals($localStorage.linkPath,undefined)) {
        $localStorage.linkPath=[];
      }
      $localStorage.linkPath.push(menu);
      $rootScope.linkPath=$localStorage.linkPath;

      if (menu.childMenuStructure.length) {
        $scope.userMenus=menu.childMenuStructure;
      }
      else if(menu.actions){
            //edit by arun
            
            $scope.stateGo(menu.actions);
          
      }

    };

   $rootScope.goHome = function(){//when click home button this function triggers
      $localStorage.linkPath=[];//link path set to null
      $rootScope.linkPath=$localStorage.linkPath;
      $rootScope.navBar=false;
      $scope.userMenus=$scope.userMenusOrigin;
      $state.go('home.main');
    };

    //funtion created by arun 
    //purpose special code with state manipulation 
    $scope.stateGo =function(actions){
          var targetState = $scope.stateSplit(actions[0].stateName);
          if(angular.equals($scope.objectCode,undefined)){
               $state.go(targetState);//go to the curresponding state when click a link
            }
            else{
              // console.log('loadDetails special menu');
              // console.log(targetState);
              // console.log($scope.objectCode);
              var codeObjectArray=$scope.objectCode.split(":");
              // console.log(codeObjectArray);
              var value=codeObjectArray[1];
            $state.go(targetState,{key:value});//go to the curresponding state when click a link
            }

    };

    $scope.stateSplit =function(primaryState){

      var stateArray= primaryState.split('|');

      var secondaryState=stateArray[0];    
      
      $scope.objectCode=stateArray[1];
      // console.log($scope.objectCode);
      return  secondaryState; 

    };

    $scope.linkSeprate =function(linkState){
      var linkArray= linkState.split('.');
      var secondarylink=linkArray[linkArray.length-1];    
      return  secondarylink; 
    };


     $scope.stateSplitAll =function(primaryState){

      var stateArrayAll= primaryState.split('|');

      var secondaryStateAll=stateArrayAll[0];    
      return  secondaryStateAll; 

    };

 
    $rootScope.goMenu = function(menu,index){//for go to a particular menu when click the menu path
      
      

      $localStorage.currentMenuName = menu.MenuName;
      $localStorage.currentMenuLink = menu.MenuLink;

       var trim_val=$localStorage.linkPath.length-index-1;
        for (var link_index = 0; link_index < trim_val; link_index++) {
          $localStorage.linkPath.pop();
        }

      if (!angular.equals(menu.actions,undefined)) {
        
            
           $scope.stateGo(menu.actions);
          
      }
      else {
        
        $rootScope.linkPath = $localStorage.linkPath;
        $scope.userMenus = menu.childMenuStructure;
        $state.go('home.main');
      }

      
    };


  function getMenuByLink(menu,sub,path_obj,state, fnCallback){
   
    if (sub==null) {
      sub=0;
    }
    
    if(!angular.equals(menu[sub],undefined)){
      getMenuByLink(menu,sub+1,path_obj,state, fnCallback);
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
          getMenuByLink(menu[sub].childMenuStructure,null,path_obj,state, fnCallback);
        }
        else{
          if(path_obj==null){
            path_obj=[];
          }

          for (var action in menu[sub].actions){

            var stateParams = '';
            if(!angular.equals($state.params.key, undefined)){
              stateParams = '|key:'+$state.params.key;
            }
            if (angular.equals(menu[sub].actions[action].stateName,(state+stateParams))&&(angular.equals(menu[sub].MenuName,$localStorage.currentMenuName))) {
              $rootScope.menuExist = true;
              path_obj.push(menu[sub]);
              $rootScope.navBar=true;
              $localStorage.linkPath=path_obj;
              $rootScope.linkPath=$localStorage.linkPath;
              fnCallback();
              break;

            }

            else if(angular.equals(menu[sub].actions[action].stateName,(state+stateParams))&&(!angular.equals($localStorage.currentMenuLink,$scope.linkSeprate(state)))){
              $rootScope.menuExist=true;
              path_obj.push(menu[sub]);
              $rootScope.navBar=true;
              $localStorage.linkPath=path_obj;
              $rootScope.linkPath=$localStorage.linkPath;
              fnCallback();
              break;
            }

          }
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
      $rootScope.showScrollbarBreadcrumb=bcWidth>containerWidth;
    });


    $scope.menuHover = function(element){
     // console.log(getComputedStyle(element));
    };

    $scope.viewMobileMenu = function(){
      $scope.viewMenu = !$scope.viewMenu;
    };



/*
This area is for keeping code for managing notifications, please add the other codes before this line.
Here we are defining all the socket.oi listeners and broadcastings, so that we can get all the things in all pages and
can manage it at single place.
*/

if($rootScope.userinfo){

var socketio = notification.socket();
// console.log('notification'+$rootScope.userinfo.userLoginId);
socketio.removeEventListener('notification'+$rootScope.userinfo.userLoginId); /* For avoiding duplicate listener
                                                                                */
socketio.on('notification'+$rootScope.userinfo.userLoginId,function (data) {
  // console.log(data);
  $rootScope.data.userNotification.notifications.splice(0,0,data.notification);
  $rootScope.data.userNotification.unreadCount = $rootScope.data.userNotification.unreadCount+1;
  $rootScope.$digest();
});



$rootScope.notificationLink = function (notificationObj,mainObj) {
  var link = notificationObj.link;
  var id = notificationObj._id.$oid;
  // console.log(link,id);
  if(notificationObj.read==0){
    var updated = notification.markNotificationAsRead($scope.userinfo.userLoginId,id);
      updated.then(function (response) {
        notificationObj.read = 1;
        if(!angular.equals(mainObj,undefined)){
          mainObj.unreadCount = mainObj.unreadCount-1;
        }
      });  
  }
  notification.newNotification({companyId:'54d836934ed3269b80684843',message:'testing notification',link:{state:'home.main',params:{}},crmId:'559393aa65f384694144b65a'});
  $state.go(link.state,link.params);
};

}



}]);