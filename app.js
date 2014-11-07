angular.module('baabtra', [
    'ngAnimate',
    'ngCookies',
    'ngResource',    
    'ngSanitize',
    'ngTouch',
    'ui.tree',
    'LocalStorageModule',
    'ui.bootstrap',
    'ui.utils',
    'ui.router'
  ])

.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('baabls');
  //"baabls" as a localStorage name prefix so our app 
  //doesn’t accidently read from another app using the same variable names:
}]);

angular.module('baabtra').config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    // .state('landing', {
    //       url: '/',
    //       templateUrl: '^landingSite/landing.html',
    //       //controller: 'CtloginCtrl'//,
    //      // controllerAs: 'book'
    //     })

      .state('login', {
          url: '/',
          templateUrl: 'angularModules/login-index-main/directives/Directive-loginBox.html',
          controller: 'CtloginCtrl'//,
         // controllerAs: 'book'
        })
      
     .state('home', {
        url: '/home',
        templateUrl: 'angularModules/common/partials/Partial-home.html',
        controller: '',
      })

      .state('add_user_menu', {
          url:'/add_user_menu',
          templateUrl: 'angularModules/user-role-menu/directives/Directive-addUserMenu.html',
          controller: 'AddUserMenuCtrl'//,
         // controllerAs: 'book'
        })

      .state('company_manage_role', {
          url:'/company_manage_role',
          templateUrl: 'angularModules/user-role-menu/directives/Directive-manageUserRole.html',
          controller: 'CompanymanageroleCtrl'//,
         // controllerAs: 'book'
        })

      .state('company_register', {
          url: '/company_register',
          templateUrl: 'angularModules/company/directives/Directive-companyRegister.html',
          controller: 'CompanyRegisterCtrl'//,
         // controllerAs: 'book'
        })

      .state('userrolemenu', {
          url:'/userrolemenu',  
          templateUrl: 'angularModules/user-role-menu/directives/Directive-userRoleMenuDir.html',
          controller: 'UserrolemenuctrlCtrl'
      })
      
      .state('manage_user_role', {
            url:'/manage_user_role',
            templateUrl: 'angularModules/user-role-menu/directives/Directive-manageUserRole.html',
            controller: 'ManageUserRoleCtrl'
      })
      
      .state('registeredcompanies', {
            url:'/registeredcompanies',
            templateUrl: 'angularModules/company/directives/Directive-registeredCompanies.html',
            controller: 'RegisteredcompaniesCtrl'
      })

    
      .state('addCourseCategories', {
          url: '/addCourseCategories',
          templateUrl: 'angularModules/admin/partials/Partial-addCourseCategories.html',
          controller:'addCourseCategoriesCtrl'
      });
    /* Add New States Above */

    
    
    

});

angular.module('baabtra').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
