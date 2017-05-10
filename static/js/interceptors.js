
'use strict';

/* HTTP403Interceptor to redirect user to login page on HTTP 403 */
app.factory('HTTP403Interceptor',
  function ($q, $injector, $window) {
    return {
      'responseError': function(response) {
        if(response.status === 403) {
          // Needed as calling logout view directly crashes sometimes
          delete $window.localStorage.satellizer_token;
          $injector.get('$state').go('access.login');
        }
        return $q.reject(response);
      }
    }
  }
);