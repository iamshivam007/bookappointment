
'use strict';

/* Login Service */
app.service('LoginService',
  function (LoginAPI) {
    return LoginAPI
  }
);

/* Logout Service */
app.service('LogoutService',
  function (LogoutAPI) {
    return LogoutAPI
  }
);

/* Signup Service */
app.service('SignupService',
  function (SignupAPI) {
    return SignupAPI
  }
);

/* VerifyEmail Service */
app.service('VerifyEmailService',
  function (VerifyEmailAPI) {
    return VerifyEmailAPI
  }
);

/* ResetPassword Service */
app.service('ResetPasswordService',
  function (ResetPasswordAPI) {
    return ResetPasswordAPI
  }
);

/* ResetPasswordConfirm Service */
app.service('ResetPasswordConfirmService',
  function (ResetPasswordConfirmAPI) {
    return ResetPasswordConfirmAPI
  }
);

/* Users Service */
app.service('UsersService',
  function (UsersAPI) {
    return UsersAPI
  }
);

/* Store Admin Service */
app.factory('StoreAdminService',
  function (StoreAdminAPI) {
    return StoreAdminAPI
  }
);

/* Shopper Service */
app.factory('ShopperService',
  function (ShopperAPI) {
    return ShopperAPI
  }
);

// Personal Assistant Service
app.factory('PersonalAssistantService',
  function (PersonalAssistantAPI) {
    return PersonalAssistantAPI
  }
);

// Store service
app.factory('StoresService',
  function (StoreAPI) {
    return StoreAPI
  }
);

// Appointments service
app.factory('AppointmentsService',
  function (AppointmentsAPI) {
    return AppointmentsAPI
  }
);

// AppointmentShip service
app.factory('AppointmentShipService',
  function (AppointmentShipAPI) {
    return AppointmentShipAPI
  }
);

// Registry service
app.factory('RegistryService',
  function (RegistryAPI) {
    return RegistryAPI
  }
);

// StoreSubscriptions service
app.factory('StoreSubscriptionsService',
  function (StoreSubscriptionsAPI) {
    return StoreSubscriptionsAPI
  }
);

// RoleSubscriptions service
app.factory('RoleSubscriptionsService',
  function (RoleSubscriptionsAPI) {
    return RoleSubscriptionsAPI
  }
);

// ServiceSubscriptions service
app.factory('ServiceSubscriptionsService',
  function (ServiceSubscriptionsAPI) {
    return ServiceSubscriptionsAPI
  }
);

// SkillRoleRelation service
app.factory('SkillRoleRelationService',
  function (SkillRoleRelationAPI) {
    return SkillRoleRelationAPI
  }
);

// Skills service
app.factory('SkillsService',
  function (SkillsAPI) {
    return SkillsAPI
  }
);

// Roles service
app.factory('RolesService',
  function (RolesAPI) {
    return RolesAPI
  }
);

// Services service
app.factory('ServicesService',
  function (ServicesAPI) {
    return ServicesAPI
  }
);