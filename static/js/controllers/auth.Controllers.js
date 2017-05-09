/**
 * Auth Controllers
 * Created by Vaibhav Jain on 22/10/16.
 * Website: https://www.kaizentechlabs.in
 * kaizentech cloud solutions private limited. All Rights Reserved.
 */

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
    ResponseHandlerService, UserDetailsService) {
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
          $scope.userDetail();
        },
        function(error) {
          $scope.loading = false;
          $scope.loginButtonDisabled = false;
          ResponseHandlerService.errorHandler(error);
        }
      )
    };
    $scope.userDetail = function(){
      UsersService.one().get().then(
        function (response) {
          console.log(response);
        }
      )
    }
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