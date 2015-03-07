(function() {

    'use strict';

    //window.addEventListener('polymer-ready', function() { angular.bootstrap(wrap(document), ['baabtra']); });

    /**
     * @ngdoc overview
     * @name app
     * @description
     * # app
     *
     * Main module of the application.
     */
    var baabtra = angular
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
        'LocalStorageModule',
        'ui.tree',
        'xtForm',
        'xeditable',
        'angularFileUpload',
        'uiRouterStyles',
        'schemaForm',
        'ui.select',
        function(){  return 'fg';}(),
        'ui.bootstrap.contextMenu',
        'ngFacebook',
        'perfect_scrollbar',
        'googleplus',
        'ngLinkedIn',
        'perfect_scrollbar',
        'ngTagsInput',
        'ngQuill',
        'hierarchical-selector',
        'angularSpectrumColorpicker',       
        'multi-select',
        'ngImgCrop',
        'monospaced.qrcode',
        'masonry',
        'googlechart',
        'gettext'
      ]).run(function(editableOptions) {
  editableOptions.theme = 'bs3';
}).run(function(gettextCatalog){
  gettextCatalog.currentLanguage = 'ar';
  gettextCatalog.debug = true;
})



//code to get the bootstrap-mterial-design working
  $.material.init();


}());

