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
              .state('home.main.company', {
                url: '/company',
                views:{
                  'innercontent':{
                templateUrl: 'angularModules/company/partials/Partial-company_view.html',
                controller:'CompanyViewCtrl'
                                  }
                      }
                
              })

              .state('home.main.company.registration', {
                url: '/registration',
                views:{
                  'manage': {
                templateUrl: 'angularModules/company/partials/Partial-company_registration.html',
                controller: 'CompanyRegistrationCtrl'
                            }
                      }
              })
              .state('home.main.company.manage', {
                url: '/manage',
                views: {
                  // So this one is targeting the unnamed view within the parent state's template.
                  'manage': {
                    templateUrl: 'angularModules/company/partials/Partial-company_manage.html'
                  }
                 
                }
              }) 
              .state('home.main.company.manage.info', {
                url: '/company-info/:companyId',
                views: {
                  // So this one is targeting the unnamed view within the parent state's template.
                  'manage-container': {
                    templateUrl: 'angularModules/company/partials/Partial-company_manage_info.html'
                  } 
                }
              })
              .state('home.main.company.manage.billing-config', {
                url: '/company-billing-config/:companyId',
                views: {
                  // So this one is targeting the unnamed view within the parent state's template.
                  'manage-container': {
                    templateUrl: 'angularModules/billing/partials/Partial-user_billing_config.html',
                    controller:'UserBillingConfigCtrl'
                  } 
                }
              })
              .state('home.main.company.manage.feature-config', {
                url: '/company-feature-config/:companyId',
                views: {
                  // So this one is targeting the unnamed view within the parent state's template.
                  'manage-container': {
                    templateUrl: 'angularModules/feature/partials/Partial-user_feature_config.html',
                    controller:'UserFeatureConfigCtrl'
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
              .state('home.main.company.manage.role', {
                url: '/role',
                templateUrl: 'angularModules/company/partials/Partial-manage_user_role.html',
                controller:'ManageUserRoleCtrl'
              })
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
              .state('home.main.roleMenuMapping', {
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
                  }
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

               .state('home.main.registerReseller', {
                url: '/registerReseller',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Reseller/partials/Partial-reseller.html',
                    controller: 'ResellerCtrl'
                  }
                }
                
              })

               .state('home.main.addCourseElement', {
                url: '/courseElement',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/course/partials/Partial-addCourseElement.html',
                    controller: 'AddcourseelementCtrl'
                  }
                }
                
              })
               .state('home.main.addCourseDomain', {
                url: '/addCourseDomain',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/course/partials/Partial-addCourseDomain.html',
                    controller: 'AddcoursedomainCtrl'
                  }
                }
              })
                .state('home.main.addExitCriteria', {
                url: '/exitCriteria',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/course/partials/Partial-addExitCriteria.html',
                    controller: 'AddexitcriteriaCtrl'
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
              .state('home.main.addCourse', {
                url: '/addCourse',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/course/partials/Partial-addCourse.html',
                    controller: 'AddcourseCtrl'
                  }
                }
                
              })

              .state('home.main.draftedCourses', {
                url: '/draftedCourses',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/course/partials/Partial-draftedCourses.html',
                    controller: 'DraftedcoursesCtrl'
                  }
                }
                
              })

              .state('home.main.addCourse.step1', {
                url: '/step1/:courseId',
                views:{
                  'addCourse-container':{
                    templateUrl: 'angularModules/course/partials/addCourseStep1.html'
                  }
                }
                
              })
              .state('home.main.addCourse.step2', {
                url: '/step2/:courseId',
                views:{
                  'addCourse-container':{
                    templateUrl: 'angularModules/course/partials/addCourseStep2.html'
                  }
                }
                
              })
              .state('home.main.addCourse.step3', {
                url: '/step3/:courseId',
                views:{
                  'addCourse-container':{
                    templateUrl: 'angularModules/course/partials/addCourseStep3.html'
                  }
                }
                
              })
              .state('home.main.userRegistration', {
                url: '/userRegistration',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/user/partials/Partial-userRegistration.html',
                     controller: 'UserregistrationCtrl'

                  }
                }
                
              })
              .state('home.main.userRegistration.step1', {
                url: '/step1',
                views:{
                  'userRegistration-container':{
             
                    templateUrl: 'angularModules/user/partials/step1_UserInfo.html'
                     // controller: 'UserregistrationCtrl'

                  }
                }
                
              })
              .state('home.main.userRegistration.step2', {
                url: '/step2',
                views:{
                  'userRegistration-container':{
             
                    templateUrl: 'angularModules/user/partials/step2_UserInfo.html'
                     // controller: 'UserregistrationCtrl'

                  }
                }
                
              })
               .state('home.main.userRegistration.step3', {
                url: '/step3',
                views:{
                  'userRegistration-container':{
             
                    templateUrl: 'angularModules/user/partials/step3_SocialProfile.html'
                     // controller: 'UserregistrationCtrl'

                  }
                }
                
              })
               .state('home.main.userRegistration.step4', {
                url: '/step4',
                views:{
                  'userRegistration-container':{
             
                    templateUrl: 'angularModules/user/partials/step4_OfficeAdmin.html'
                     // controller: 'UserregistrationCtrl'

                  }
                }
                
              })

               .state('home.main.userRegistration.step5', {
                url: '/step5',
                views:{
                  'userRegistration-container':{
                    templateUrl: 'angularModules/user/partials/step5_payment.html'
                  }
                }
              })

               .state('home.main.formCustomizer', {
                url: '/formCustomizer',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/form/partials/Partial-formCustomizer.html',
                     controller: 'FormcustomizerCtrl'
                  }
                }
              })

               .state('home.main.formCustomizer.SelectForm', {
                url: '/SelectForm',
                views:{
                  'formCustom-container':{
                    templateUrl: 'angularModules/form/partials/selectForm.html'
                  }
                }
              })
               .state('home.main.formCustomizer.SelectStep', {
                url: '/SelectStep',
                views:{
                  'formCustom-container':{
                    templateUrl: 'angularModules/form/partials/selectStep.html'
                  }
                }
              })
               .state('home.main.formCustomizer.customizeForm', {
                url: '/customizeForm',
                views:{
                  'formCustom-container':{
                    templateUrl: 'angularModules/form/partials/customizeForm.html'
                  }
                }
              })
                         

              .state('userRegistration', {
                url: '/userRegistration',
                
                    templateUrl: 'angularModules/user/partials/Partial-userRegistration.html',
                     controller: 'UserregistrationCtrl'

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
                .state('home.PublishedCourse', {
                url: '/PublishedCourse',
                templateUrl: 'angularModules/course/partials/Partial-PublishedCourse.html',
                controller: 'PublishedcourseCtrl'
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
