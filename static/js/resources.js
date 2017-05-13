
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

// Appointment API
app.factory('AppointmentsAPI',
  function (Restangular) {
    return Restangular.service('appointments')
  }
);

// AppointmentShip API
app.factory('AppointmentShipAPI',
  function (Restangular) {
    return Restangular.service('appointmentships')
  }
);

// Registry API
app.factory('RegistryAPI',
  function (Restangular) {
    return Restangular.service('registries')
  }
);

// StoreSubscriptions API
app.factory('StoreSubscriptionsAPI',
  function (Restangular) {
    return Restangular.service('storesubscriptions')
  }
);

// RoleSubscriptions API
app.factory('RoleSubscriptionsAPI',
  function (Restangular) {
    return Restangular.service('rolesubscriptions')
  }
);

// ServiceSubscription API
app.factory('ServiceSubscriptionsAPI',
  function (Restangular) {
    return Restangular.service('servicesubscriptions')
  }
);

// SkillRoleRelation API
app.factory('SkillRoleRelationAPI',
  function (Restangular) {
    return Restangular.service('skillrolerelation')
  }
);

// Skill API
app.factory('SkillsAPI',
  function (Restangular) {
    return Restangular.service('skills')
  }
);

// Role API
app.factory('RolesAPI',
  function (Restangular) {
    return Restangular.service('roles')
  }
);

// Services API
app.factory('ServicesAPI',
  function (Restangular) {
    return Restangular.service('services')
  }
);
