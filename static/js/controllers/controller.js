function convertFileToBase64String(file) {
  return "data:" + file.filetype + ";base64," + file.base64;
}

app.controller('ListStoreController',
  function ($scope, $modal, StoresService, ToasterService) {
    StoresService.one().get().then(
      function (success) {
        $scope.stores = success;
      }
    );

    $scope.bookAppointment = function (id) {
      var bookAppointmentModalInstance = $modal.open({
          templateUrl: 'book_appointment',
          controller: 'BookAppointmentController',
          size: undefined,
          resolve: {
            id: function () {
              return id
            }
          }
        }
      );
      bookAppointmentModalInstance.result.then(
        function () {
          ToasterService.successHandler('Success', "Appointment Booked Successfully");
        },
        function () {
        }
      );
    };

    $scope.addStore = function () {
      var addStoreModalInstance = $modal.open({
          templateUrl: "add_store",
          controller: "StoreController",
          size: undefined,
          resolve: {
            id: function () {
              return ""
            }
          }
        }
      );
      addStoreModalInstance.result.then(
        function (store) {
          $scope.stores.push(angular.copy(store));
          ToasterService.successHandler("Store", "Added Successfully")
        }
      )
    };

    $scope.editStore = function (id, index) {
      var editStoreModalInstance = $modal.open({
          templateUrl: "add_store",
          controller: "StoreController",
          size: undefined,
          resolve: {
            id: function () {
              return id
            }
          }
        }
      );
      editStoreModalInstance.result.then(
        function (store) {
          $scope.stores[index] = angular.copy(store);
          ToasterService.successHandler("Store", "Edited Successfully")
        }
      )
    };

    $scope.deleteStore = function (id, index) {
      var deleteStoreModalInstance = $modal.open({
          templateUrl: "delete_store",
          controller: "StoreController",
          size: undefined,
          resolve: {
            id: function () {
              return id
            }
          }
        }
      );
      deleteStoreModalInstance.result.then(
        function () {
          $scope.stores.splice(index, 1);
          ToasterService.successHandler("Store", "Deleted Successfully")
        }
      )
    }
  }
);

app.controller("StoreController",
  function ($scope, StoresService, ServicesService, ChoicesService, $modalInstance,
  $filter, ResponseHandlerService, id) {
    $scope.services = [];
    $scope.days = [];
    $scope.store = {};
    ServicesService.one().get().then(
      function (success) {
        $scope.services = success;
      }
    );
    ChoicesService.one('days_choices').get().then(
      function (success) {
        $scope.days = success.choices;
      }
    );

    if (id){
      StoresService.one(id).get().then(
        function (success) {
          $scope.store = success;
          var parts = $scope.store.opening_time.split(':');
          $scope.store.opening_time = new Date(0, 0, 0, parts[0], parts[1], parts[2]);
          parts = $scope.store.closing_time.split(':');
          $scope.store.closing_time = new Date(0, 0, 0, parts[0], parts[1], parts[2]);
        }
      )
    }

    $scope.save = function () {
      var store = angular.copy($scope.store);
      store.opening_time = $filter('date')($scope.store.opening_time, "H:mm");
      store.closing_time = $filter('date')($scope.store.closing_time, "H:mm");
      StoresService.one().customPOST(store).then(
        function (success) {
          $modalInstance.close(success)
        },
        function (error) {
          ResponseHandlerService.errorHandler(error);
        }
      )
    };

    $scope.update = function () {
      var store = angular.copy($scope.store);
      store.opening_time = $filter('date')($scope.store.opening_time, "H:mm");
      store.closing_time = $filter('date')($scope.store.closing_time, "H:mm");
      StoresService.one(id).patch(store).then(
        function (success) {
          $modalInstance.close(success)
        },
        function (error) {
          ResponseHandlerService.errorHandler(error);
        }
      )
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.delete = function () {
      StoresService.one(id).remove().then(
        function (success) {
          $modalInstance.close(success);
        }
      )
    }
  }
);


app.controller('BookAppointmentController',
  function ($scope, $modalInstance, id, StoresService, UserDetailsService, AppointmentsService,
  ShopperService, ServicesService, $filter) {
    $scope.appointment = {};
    var UserID = UserDetailsService.getUID();

    StoresService.one('', id).get().then(
      function (success) {
        $scope.store = success[0];
        $scope.appointment.store = id;
        getServices();
      }
    );

    var getServices = function () {
      ServicesService.one().get({id__in:$scope.store.services}).then(
        function (success) {
          $scope.services = success.plain()
        }
      )
    };

    ShopperService.one().get({user:UserID}).then(
      function (success) {
        $scope.shopper = success[0];
        $scope.appointment.shopper = $scope.shopper.id;
      }
    );

    $scope.save = function () {
      var appointment = angular.copy($scope.appointment);
      appointment.start_time = $filter('date')($scope.appointment.start_time, 'H:mm');
      appointment.end_time = $filter('date')($scope.appointment.end_time, 'H:mm');
      appointment.date = $filter('date')($scope.appointment.date, 'yyyy-MM-dd');
      AppointmentsService.one().customPOST(appointment).then(
        function (success) {
          $modalInstance.close(success);
        }
      )
    }
  }
);

// List Appointment Controller
app.controller('ListAppointmentsController',
  function ($scope, AppointmentsService, $modal, ToasterService) {
    AppointmentsService.one().get().then(
      function (success) {
        $scope.appointments = success;
      }
    );

    $scope.cancelAppointment = function (id, index) {
      var deleteStoreModalInstance = $modal.open({
          templateUrl: "cancel_appointment",
          controller: "CancelAppointmentController",
          size: undefined,
          resolve: {
            id: function () {
              return id
            }
          }
        }
      );
      deleteStoreModalInstance.result.then(
        function (appointment) {
          $scope.appointments[index] = angular.copy(appointment);
          ToasterService.successHandler("Appointment", "Canceled Successfully")
        }
      )
    }
  }
);

app.controller("CancelAppointmentController",
  function ($scope, AppointmentsService, id, $modalInstance) {

    AppointmentsService.one(id).get().then(
      function (success) {
        $scope.appointment = success;
      }
    );

    $scope.cancelAppointment = function () {
      var appointment = angular.copy($scope.appointment);
      appointment.status = "Cancel";
      AppointmentsService.one(id).patch(appointment).then(
        function (success) {
          $modalInstance.close(success);
        }
      );
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
);

// List Skills Controller
app.controller('ListSkillsController',
  function ($scope, SkillsService, $modal, ToasterService) {
    SkillsService.one().get().then(
      function (success) {
        $scope.skills = success;
      }
    );

    $scope.addSkill = function () {
      var addSkillModalInstance = $modal.open({
          templateUrl: "add_edit_skill",
          controller: "SkillController",
          size: undefined,
          resolve: {
            id: function () {
              return ""
            }
          }
        }
      );
      addSkillModalInstance.result.then(
        function (skill) {
          $scope.skills.push(angular.copy(skill));
          ToasterService.successHandler("Skill", "Added Successfully")
        }
      )
    };

    $scope.editSkill = function (id, index) {
      var addSkillModalInstance = $modal.open({
          templateUrl: "add_edit_skill",
          controller: "SkillController",
          size: undefined,
          resolve: {
            id: function () {
              return id
            }
          }
        }
      );
      addSkillModalInstance.result.then(
        function (skill) {
          $scope.skills[index] = angular.copy(skill);
          console.log(index, skill);
          ToasterService.successHandler("Skill", "Updated Successfully")
        }
      )
    };

    $scope.deleteSkill = function (id, index) {
      var deleteSkillModalInstance = $modal.open({
          templateUrl: "delete_skill",
          controller: "SkillController",
          size: undefined,
          resolve: {
            id: function () {
              return id
            }
          }
        }
      );
      deleteSkillModalInstance.result.then(
        function () {
          $scope.skills.splice(index, 1);
          ToasterService.successHandler("Skill", "Deleted Successfully")
        }
      )
    }

  }
);

// Skill Controller
app.controller("SkillController",
  function ($scope, SkillsService, $modalInstance,
  $filter, ResponseHandlerService, id) {

    if (id){
      SkillsService.one(id).get().then(
        function (success) {
          $scope.skill = success;
        }
      )
    }

    $scope.save = function () {
      SkillsService.one().customPOST($scope.skill).then(
        function (success) {
          $modalInstance.close(success.plain())
        },
        function (error) {
          ResponseHandlerService.errorHandler(error);
        }
      )
    };

    $scope.update = function () {
      SkillsService.one(id).patch($scope.skill).then(
        function (success) {
          $modalInstance.close(success.plain())
        },
        function (error) {
          ResponseHandlerService.errorHandler(error);
        }
      )
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.delete = function () {
      SkillsService.one(id).remove().then(
        function (success) {
          $modalInstance.close(success);
        }
      )
    }
  }
);

// List Roles Controller
app.controller('ListRolesController',
  function ($scope, RolesService, $modal, ToasterService) {
    RolesService.one().get().then(
      function (success) {
        $scope.roles = success;
      }
    );

    $scope.addRole = function () {
      var addRoleModalInstance = $modal.open({
          templateUrl: "add_edit_role",
          controller: "RoleController",
          size: undefined,
          resolve: {
            id: function () {
              return ""
            }
          }
        }
      );
      addRoleModalInstance.result.then(
        function (role) {
          $scope.roles.push(angular.copy(role));
          ToasterService.successHandler("Role", "Added Successfully")
        }
      )
    };

    $scope.editRole = function (id, index) {
      var addRoleModalInstance = $modal.open({
          templateUrl: "add_edit_role",
          controller: "RoleController",
          size: undefined,
          resolve: {
            id: function () {
              return id
            }
          }
        }
      );
      addRoleModalInstance.result.then(
        function (role) {
          $scope.roles[index] = angular.copy(role);
          ToasterService.successHandler("Role", "Updated Successfully")
        }
      )
    };

    $scope.deleteRole = function (id, index) {
      var deleteRoleModalInstance = $modal.open({
          templateUrl: "delete_role",
          controller: "RoleController",
          size: undefined,
          resolve: {
            id: function () {
              return id
            }
          }
        }
      );
      deleteRoleModalInstance.result.then(
        function () {
          $scope.roles.splice(index, 1);
          ToasterService.successHandler("Role", "Deleted Successfully")
        }
      )
    }

  }
);

// Role Controller
app.controller("RoleController",
  function ($scope, RolesService, $modalInstance,
  $filter, ResponseHandlerService, id) {

    if (id){
      RolesService.one(id).get().then(
        function (success) {
          $scope.role = success;
        }
      )
    }

    $scope.save = function () {
      RolesService.one().customPOST($scope.role).then(
        function (success) {
          $modalInstance.close(success.plain())
        },
        function (error) {
          ResponseHandlerService.errorHandler(error);
        }
      )
    };

    $scope.update = function () {
      RolesService.one(id).patch($scope.role).then(
        function (success) {
          $modalInstance.close(success.plain())
        },
        function (error) {
          ResponseHandlerService.errorHandler(error);
        }
      )
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.delete = function () {
      RolesService.one(id).remove().then(
        function (success) {
          $modalInstance.close(success);
        }
      )
    }
  }
);

// List Role Subscription Controller
app.controller('ListRoleSubscriptionsController',
  function ($scope, RolesService, $modal, ToasterService, RoleSubscriptionsService, $filter) {

    $scope.status = "pending";

    RolesService.one().get().then(
      function (success) {
        $scope.roles = success;
      }
    );

    $scope.getRoleSubscriptions = function () {
      RoleSubscriptionsService.one().get().then(
        function (success) {
          $scope.allRoleSubscriptions = success;
          $scope.changeStatus();
        }
      );
    };

    $scope.getRoleSubscriptions();

    $scope.changeStatus = function () {
      if($scope.status == 'pending'){
        $scope.roleSubscriptions = $filter('filter')($scope.allRoleSubscriptions, {'is_approved':false});
      }
      if($scope.status == 'verified'){
        $scope.roleSubscriptions = $filter('filter')($scope.allRoleSubscriptions, {'is_approved':true});
      }
    };

    $scope.disApprove_role = function (id, index) {
      $scope.roleSubscriptions[index].is_approved = false;
      RoleSubscriptionsService.one(id).patch($scope.roleSubscriptions[index]).then(
        function (success) {
          ToasterService.successHandler("Role", "DisApproved Successfully.");
          $scope.getRoleSubscriptions();
        }
      );
    };

    $scope.Approve_role = function (id, index) {
      $scope.roleSubscriptions[index].is_approved = true;
      RoleSubscriptionsService.one(id).patch($scope.roleSubscriptions[index]).then(
        function (success) {
          ToasterService.successHandler("Role", "Approved Successfully.");
          $scope.getRoleSubscriptions();
        }
      );
    }

  }
);