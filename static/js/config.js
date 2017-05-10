/*
 * app config
 */

var app = angular.module('app').config(
  function (
    $controllerProvider, $compileProvider, $filterProvider, $provide) {
    // lazy controller, directive and service
    app.controller = $controllerProvider.register;
    app.directive  = $compileProvider.directive;
    app.filter     = $filterProvider.register;
    app.factory    = $provide.factory;
    app.service    = $provide.service;
    app.constant   = $provide.constant;
    app.value      = $provide.value;
  })
  .config(function($translateProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'static/l10n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
  })
  // Restangular Configuration
  .config(function (RestangularProvider) {
    RestangularProvider.setBaseUrl('/api/');
    RestangularProvider.setRequestSuffix("/");
  })
  // Satellizer Configuration
  .config(function($authProvider) {
    $authProvider.baseUrl = '/api/';
    $authProvider.loginUrl = '/login/';
    $authProvider.signupUrl = '/signup/';
    $authProvider.tokenName = 'key';
    $authProvider.authToken = 'Token';
  });