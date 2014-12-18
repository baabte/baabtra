(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name app.config:uiRouter
     * @description
     * # Config
     * Config for the pages router
     */
    angular.module('baabtra')
      .config(
        ['$stateProvider', '$urlRouterProvider',
          function ( $stateProvider,   $urlRouterProvider ) {
            $stateProvider
              .state('page', {
                url: '/page',
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
              .state('home', {
                url: '/home',
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
              .state('home.company', {
                url: '/company',
                templateUrl: 'angularModules/company/partials/Partial-company_view.html',
                controller:'CompanyViewCtrl'
                
              })

              .state('home.company.registration', {
                url: '/registration',
                views:{
                  'manage': {
                templateUrl: 'angularModules/company/partials/Partial-company_registration.html',
                controller: 'CompanyRegistrationCtrl'
                            }
                      }
              })
              .state('home.company.manage', {
                url: '/manage',
                views: {
                  // So this one is targeting the unnamed view within the parent state's template.
                  'manage': {
                    templateUrl: 'angularModules/company/partials/Partial-company_manage.html'
                  }
                 
                }
              }) 
              .state('home.company.manage.info', {
                url: '/company-info/:companyId',
                views: {
                  // So this one is targeting the unnamed view within the parent state's template.
                  'manage-container': {
                    templateUrl: 'angularModules/company/partials/Partial-company_manage_info.html'
                  } 
                }
              })
              .state('home.company.manage.billing-config', {
                url: '/company-billing-config/:companyId',
                views: {
                  // So this one is targeting the unnamed view within the parent state's template.
                  'manage-container': {
                    templateUrl: 'angularModules/billing/partials/Partial-user_billing_config.html'
                  } 
                }
              })
              .state('home.company.manage.feature-config', {
                url: '/company-feature-config/:companyId',
                views: {
                  // So this one is targeting the unnamed view within the parent state's template.
                  'manage-container': {
                    templateUrl: 'angularModules/feature/partials/Partial-user_feature_config.html'
                  } 
                }
              })

              .state('page.profile', {
                url: '/profile',
                templateUrl: 'views/pages/profile.html'
              })
              .state('page.settings', {
                url: '/settings',
                templateUrl: 'views/pages/settings.html'
              })
              .state('page.blank', {
                url: '/blank',
                templateUrl: 'views/pages/blank.html'

              })
		          .state('login', {
                url: '/login',
                templateUrl: 'angularModules/login/partials/Partial-Login_view.html',
                controller:'LoginViewCtrl'
              })
              .state('home.main', {
                url: '/main',
                templateUrl: 'angularModules/login/partials/Partial-home.html',
                controller:'HomeCtrl'
              })
              .state('home.company.manage.role', {
                url: '/role',
                templateUrl: 'angularModules/company/partials/Partial-manage_user_role.html',
                controller:'ManageUserRoleCtrl'
              })
<<<<<<< HEAD
              .state('home.feature_config', {
                url: '/feature_config',
                templateUrl: 'angularModules/feature/partials/Partial-feature_config.html',
                controller:'FeatureConfigCtrl'
              })
              .state('home.billing_plans', {
                url: '/billing_plans',
                templateUrl: 'angularModules/billing/partials/Partial-billing_plans.html',
                controller:'BillingPlansCtrl'
              })
              .state('home.roleMenuMapping', {
=======
              .state('home.main.roleMenuMapping', {
>>>>>>> c205c57bf3642dc4132ec5f82057efeed327ff81
                url: '/roleMenuMapping',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/roleMenuMapping/partials/Partial-roleMenuMapping.html',
                    controller:'RoleMenuMappingCtrl'
                  }
              }
              })
              .state('home.main.manageCompany', {
                url: '/manageCompany',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/company/partials/Partial-manageCompany.html',
                    controller:'ManagecompanyCtrl'
                  }
              }
              })
              .state('home.main.manageCompany.company', {
                url: '/cmp_id={companyId}',
                views:{
                  'companycontent':{
                    templateUrl: 'angularModules/company/partials/Partial-companyHome.html',
                    controller:'CompanyhomeCtrl'
                  }
              }
              })
              .state('home.main.Branches', {
                url: '/Branches',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Branches/partials/Partial-Branches.html',
                    controller:'BranchesCtrl'
                   }                  
                  },
                data: { css: 'bower_components/angular-ui-tree/demo/css/demp-horizontal.css'}
              
              })
               .state('home.main.userMenuMapping', {
                url: '/userMenuMapping',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/company/partials/Partial-userMenuMapping.html',
                    controller: 'UsermenumappingCtrl'
                  }
                }
                
              })

              .state('home.main.addMenu', {
                url: '/addMenu',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/company/partials/Partial-addMenu.html',
                    controller: 'AddmenuCtrl'
                  }
                }
                
              })

                .state('home.JobPosting', {
                url: '/JobPosting',
                templateUrl: 'angularModules/company/partials/Partial-JobPosting.html',
                controller: 'JobpostingCtrl'
              })
                .state('home.ViewJobs', {
                url: '/ViewJobs',
                templateUrl: 'angularModules/company/partials/Partial-ListJobs.html',
                controller: 'ListjobsCtrl'
              })
              .state('page.document', {
                url: '/document',
                templateUrl: 'views/pages/document.html'
              })
              .state('signin', {
                url: '/signin',
                templateUrl: 'views/pages/signin.html'
              })
              .state('signup', {
                url: '/signup',
                templateUrl: 'views/pages/signup.html'
              })
              .state('forgot-password', {
                url: '/forgot-password',
                templateUrl: 'views/pages/forgot-password.html'
              })
              .state('lockme', {
                url: '/lockme',
                templateUrl: 'views/pages/lockme.html'
              })
              .state('404', {
                url: '/404',
                templateUrl: 'views/pages/404.html'
              })
              .state('505', {
                url: '/505',
                templateUrl: 'views/pages/505.html'
              });



          }
        ]
      );
}());
