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
        'ui.tree'
      ])

       .config(
        ['$stateProvider', '$urlRouterProvider',
          function ( $stateProvider,   $urlRouterProvider ) {
            $stateProvider
              .state('baabtra', {
                url: '/baabtra',
                views: {
                  // So this one is targeting the unnamed view within the parent state's template.
                  '': {
                    templateUrl: 'views/layout.html'
                  },
                  // This shows off how you could populate *any* view within *any* ancestor state.
                  // Oopulating the ui-view="aside@"
                  'aside': {
                    templateUrl: 'views/partials/aside.nav.pages.html'
                  }
                }
              })
                .state('baabtra.roleMenuMapping', {
                url: '/roleMenuMapping',
                templateUrl: 'angularModules/roleMenuMapping/partials/Partial-roleMenuMapping.html',
                controller: 'RoleMenuMappingCtrl'
              })
                .state('baabtra.userMenuMapping', {
                url: '/userMenuMapping',
                templateUrl: 'angularModules/company/partials/Partial-userMenuMapping.html',
                controller: 'UsermenumappingCtrl'
              })
                .state('baabtra.JobPosting', {
                url: '/JobPosting',
                templateUrl: 'angularModules/company/partials/Partial-JobPosting.html',
                controller: 'JobpostingCtrl'
              })
                .state('baabtra.ViewJobs', {
                url: '/ViewJobs',
                templateUrl: 'angularModules/company/partials/Partial-ListJobs.html',
                controller: 'ListjobsCtrl'
              });
          }
        ]
      );

}());