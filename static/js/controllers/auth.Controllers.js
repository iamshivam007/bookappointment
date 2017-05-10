'use strict';

app.controller('HeaderController',
  function ($scope, UserDetailsService) {
    $scope.user = {
      fullName: UserDetailsService.getFirstName() + " " + UserDetailsService.getLastName()
    }
  }
);

/* Login Controller */
app.controller('LoginController',
  function(
    $scope, $state, LoginService, UsersService,
    ResponseHandlerService) {
    $scope.user = {};
    $scope.loading = false;
    $scope.loginButtonDisabled = false;
    $scope.login = function () {
      $scope.loading = true;
      $scope.loginButtonDisabled = true;
      // Logging-in User
      LoginService.login($scope.user).then(
        function (response) {
          $scope.loading = false;
          $scope.loginButtonDisabled = false;
        },
        function(error) {
          $scope.loading = false;
          $scope.loginButtonDisabled = false;
          ResponseHandlerService.errorHandler(error);
        }
      )
    };
  }
);

/* Sign Up Controller */
app.controller('SignUpController',
  function(
    $scope, $state, SignupService, UsersService,
    ResponseHandlerService, ToasterService) {
    $scope.loading = false;
    $scope.signupButtonDisabled = false;
    $scope.signup = function () {
      // $scope.user.phone_number = $scope.user.phone_number;
      $scope.loading = true;
      $scope.signupButtonDisabled = true;
      SignupService.one().customPOST($scope.user).then(
        function (response) {
          $scope.loading = false;
          $scope.signupButtonDisabled = false;
          ToasterService.successHandler("Register", "Successfully");
          $state.go('access.login');
        },
        function(error) {
          $scope.loading = false;
          $scope.signupButtonDisabled = false;
          ResponseHandlerService.errorHandler(error);
        }
      )
    };
  }
);

/* Logout Controller */
app.controller('LogoutController',
  function(
    $state, $localStorage, LogoutService,
    UserDetailsService) {
    // Check If User is Already Authenticated,
    // If yes clear the local storage
    // before redirecting the user to login page
    if (LogoutService.isAuthenticated()) {
      LogoutService.logout().then(
        function() {
          UserDetailsService.clear();
          delete $localStorage.settings;
          $state.go('access.home');
        }
      );
    }
    // If not then redirect the user
    // directly to Login Page
    else {
      $state.go('access.home');
    }
  }
);

/* RestPassword Controller */
app.controller('ResetPasswordController',
  function (
    $scope, $state, $timeout,
    ResetPasswordService, ResponseHandlerService) {
    $scope.user = {};
    $scope.loading = false;
    $scope.resetPasswordButtonDisabled = false;
    $scope.resetPassword = function () {
      $scope.loading = true;
      $scope.resetPasswordButtonDisabled = true;
      ResetPasswordService.post($scope.user).then(
        function (success) {
          $scope.loading = false;
          $scope.resetPasswordButtonDisabled = false;
          ResponseHandlerService.successHandler(success);
          $timeout(function(){$state.go('access.login')}, 2500);
        },
        function (error) {
          $scope.loading = false;
          $scope.resetPasswordButtonDisabled = false;
          ResponseHandlerService.errorHandler(error);
        }
      )
    }
  }
);

app.controller('NavBarController', function (
    $scope, UserDetailsService) {
    $scope.publisher = UserDetailsService.getIsPublisher();
  }
);