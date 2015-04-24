// config

var app =  
angular.module('baabtra')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
    }
  ])
  .config(['$translateProvider', function($translateProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'i18n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
  }]).
  config(['$facebookProvider', function( $facebookProvider ) {
    $facebookProvider.setAppId('610577519050579');
  }])
  .run( function( $rootScope ) {
    // Load the facebook SDK asynchronously
    (function(){
       // If we've already installed the SDK, we're done
       if (document.getElementById('facebook-jssdk')) {return;}

       // Get the first script element, which we'll use to find the parent node
       var firstScriptElement = document.getElementsByTagName('script')[0];

       // Create a new script element and set its id
       var facebookJS = document.createElement('script'); 
       facebookJS.id = 'facebook-jssdk';

       // Set the new script's source to the source of the Facebook JS SDK
       facebookJS.src = '//connect.facebook.net/en_US/all.js';

       // Insert the Facebook JS SDK into the DOM
       firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());
  })
  .config(['GooglePlusProvider', function(GooglePlusProvider) {
     GooglePlusProvider.init({
        clientId: '786999352920-ljt333v6ovntc07buapllu52ni90tnqs.apps.googleusercontent.com',
        apiKey: 'AIzaSyCkYB9ICwEhO6gCUQLm5LUe75lj7he1bxo'
     });
  }])
  .config(['$linkedInProvider',function($linkedInProvider) {
   $linkedInProvider.set('appKey', '78jnfwsxzeqtdl').set('scope', "r_fullprofile r_network r_emailaddress").set('authorize', true);
  }])
  .constant('bbConfig',{ //used for storing enviornment variables

      // "BWS": "http://127.0.0.1:8000/",//local
    "BWS": "http://services.baabtra.com/",//server - production
     //"BWS": "http://server.mb-test.in/",//server-test
     "SARID":1, // SuperAdminRoleID
     "CURID":2, // CompanyUser
     "MURID":3, // MenteeUser
     "RURID":4  // ResellerUser
 });

angular.module('angular-custom-form',[]) /*Config constant for angular custom form */
.constant('bbConfig',{ //used for storing enviornment variables
     // "BWS": "http://127.0.0.1:8000/",//local
      "BWS": "http://services.baabtra.com/",//server - production
    // "BWS": "http://server.mb-test.in/",//server-test
     "SARID":1, // SuperAdminRoleID
     "CURID":2, // CompanyUser
     "MURID":3, // MenteeUser
     "RURID":4  // ResellerUser
 });


