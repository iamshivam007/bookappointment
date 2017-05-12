
'use strict';

/* Login API */
app.factory('LoginAPI',
  ['$auth',
    function ($auth) {
      return $auth;
    }
  ]
);

/* Logout API */
app.factory('LogoutAPI',
  ['$auth',
    function ($auth) {
      return $auth;
    }
  ]
);

/* Signup API */
app.factory('SignupAPI',
  ['Restangular',
    function (Restangular) {
      return Restangular.service('signup');
    }
  ]
);

/* FinishSetup API */
app.factory('VerifyEmailAPI',
  ['Restangular',
    function (Restangular) {
      return Restangular.service('verify-email');
    }
  ]
);

/* ResetPassword API */
app.factory('ResetPasswordAPI',
  ['Restangular',
    function (Restangular) {
      return Restangular.service('/password/reset');
    }
  ]
);

/* ResetPasswordConfirm API */
app.factory('ResetPasswordConfirmAPI',
  ['Restangular',
    function (Restangular) {
      return Restangular.service('/password/reset/confirm/');
    }
  ]
);

/* Users API */
app.factory('UsersAPI',
  function (Restangular) {
    return Restangular.service('users')
  }
);

/* Store Admin API */
app.factory('StoreAdminAPI',
  function (Restangular) {
    return Restangular.service('storesadmin')
  }
);

/* Shopper API */
app.factory('ShopperAPI',
  function (Restangular) {
    return Restangular.service('shoppers')
  }
);

// Personal Assistant API
app.factory('PersonalAssistantAPI',
  function (Restangular) {
    return Restangular.service('personalassistents')
  }
);

// Store API
app.factory('StoreAPI',
  function (Restangular) {
    return Restangular.service('stores')
  }
);