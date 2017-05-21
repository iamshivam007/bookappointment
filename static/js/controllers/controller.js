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
            ShopperService, ServicesService, $filter, PersonalAssistantService, AppointmentShipService) {
    $scope.appointment = {};
    var UserID = UserDetailsService.getUID();

    StoresService.one(id).get().then(
      function (success) {
        $scope.store = success;
        $scope.appointment.store = id;
        getServices();
      }
    );

    PersonalAssistantService.one().get().then(
      function (success) {
        $scope.personal_assistants = success;
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
          $scope.setAppointmentShips(success);
          $modalInstance.close(success);
        }
      )
    };

    $scope.setAppointmentShips = function (appointment) {
      for(var i=0;i<$scope.personal_assistants.length;i++){
        var payload = {appointment:appointment.id, personal_assistant:$scope.personal_assistants[i].id}
        payload.remark = 'Done';
        AppointmentShipService.one().customPOST(payload).then(
          function (success) {
          },
          function (error) {
            console.log(error)
          }
        )
      }
    }
  }
);

// List Appointment Controller
app.controller('ListAppointmentsController',
  function ($scope, AppointmentsService, $modal, ToasterService) {
    AppointmentsService.one().get().then(
      function (success) {
        $scope.appointments = success;
        console.log()
      }
    );

    $scope.cancelAppointment = function (id, index) {
      var cancelAppointmentModalInstance = $modal.open({
          templateUrl: "cancel_appointment",
          controller: "AppointmentController",
          size: undefined,
          resolve: {
            id: function () {
              return id
            }
          }
        }
      );
      cancelAppointmentModalInstance.result.then(
        function (appointment) {
          $scope.appointments[index] = angular.copy(appointment);
          ToasterService.successHandler("Appointment", "Canceled Successfully")
        }
      )
    };

    $scope.rejectAppointment = function (id, index) {
      var rejectAppointmentModalInstance = $modal.open({
          templateUrl: "reject_appointment",
          controller: "AppointmentController",
          size: undefined,
          resolve: {
            id: function () {
              return id
            }
          }
        }
      );
      rejectAppointmentModalInstance.result.then(
        function (appointment) {
          $scope.appointments[index] = angular.copy(appointment);
          ToasterService.successHandler("Appointment", "Rejected Successfully")
        }
      )
    };
  }
);

app.controller("AppointmentController",
  function ($scope, AppointmentsService, id, $modalInstance,
            $filter) {

    AppointmentsService.one(id).get().then(
      function (success) {
        $scope.appointment = success;
        $scope.appointment.Date = $filter('date')($scope.appointment.date, 'dd-MMM-yyyy');
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

    $scope.rejectAppointment = function () {
      var appointment = angular.copy($scope.appointment);
      appointment.status = "Rejected";
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

// List AppointmentShip Controller
app.controller('ListAppointmentShipsController',
  function ($scope, AppointmentsService, $modal, ToasterService, AppointmentShipService,
            UserDetailsService) {

    var query_param = {personal_assistant__user:UserDetailsService.getUID()};
    query_param.appointment__status__in = ['Booked', 'Under Process', 'Missed', 'Attended'];
    AppointmentShipService.one().get(query_param).then(
      function (success) {
        $scope.appointmentships = success;
        for(var i=0;i<success.length;i++){
          if ($scope.appointmentships[i].status == 'Rejected'){
            $scope.appointmentships[i].appointment_detail.status = 'Rejected';
          }
        }
      }
    );

    $scope.acceptAppointment = function (appointmentship, index) {
      appointmentship.status = 'Booked';
      AppointmentShipService.one(appointmentship.id).patch(appointmentship).then(
        function (success) {
          $scope.appointmentships[index] = success.plain();
          $scope.appointmentships[index].appointment_detail.status = 'Booked';
          ToasterService.successHandler("Appointment", "Accepted Successfully");
          $scope.deleteOtherAppointment(success);
          appointmentship.appointment_detail.status = 'Booked';
          AppointmentsService.one(appointmentship.appointment).patch(appointmentship.appointment_detail).then(
            function () {}
          )
        }
      );
    };

    $scope.deleteOtherAppointment = function (appointmentship) {
      var query_params = {appointment:appointmentship.appointment, status:'Under Process'};
      AppointmentShipService.one().get(query_params).then(
        function (success) {
          var appointments = success;
          for(var i=0;i<appointments.length;i++){
            $scope.deleteAppointment(appointments[i]);
          }
        },
        function (error) {
          console.log(error);
        }
      );
    };

    $scope.deleteAppointment = function (appointment) {
      AppointmentShipService.one(appointment.id).remove().then(
        function (success) {
        },
        function (error) {
          console.log(error);
        }
      )
    };

    $scope.rejectAppointment = function (appointmentship, index) {
      appointmentship.status = 'Rejected';
      AppointmentShipService.one(appointmentship.id).patch(appointmentship).then(
        function (success) {
          $scope.appointmentships[index] = success.plain();
          $scope.appointmentships[index].appointment_detail.status = 'Rejected';
          ToasterService.successHandler("Appointment", "Rejected Successfully");
        }
      );
    };
  }
);


// List Store Subscription Controller
app.controller('ListStoreSubscriptionsController',
  function ($scope, StoreSubscriptionsService, $modal, ToasterService, $filter) {

    $scope.status = "pending";

    $scope.getStoreSubscriptions = function () {
      StoreSubscriptionsService.one().get().then(
        function (success) {
          $scope.allStoreSubscriptions = success;
          $scope.changeStatus();
        }
      );
    };

    $scope.getStoreSubscriptions();

    $scope.changeStatus = function () {
      if($scope.status == 'pending'){
        $scope.storeSubscriptions = $filter('filter')($scope.allStoreSubscriptions, {'is_approved':false});
      }
      if($scope.status == 'verified'){
        $scope.storeSubscriptions = $filter('filter')($scope.allStoreSubscriptions, {'is_approved':true});
      }
    };

    $scope.disApprove_store = function (id, index) {
      $scope.storeSubscriptions[index].is_approved = false;
      StoreSubscriptionsService.one(id).patch($scope.storeSubscriptions[index]).then(
        function (success) {
          ToasterService.successHandler("Store", "DisApproved Successfully.");
          $scope.getStoreSubscriptions();
        }
      );
    };

    $scope.Approve_store = function (id, index) {
      $scope.storeSubscriptions[index].is_approved = true;
      StoreSubscriptionsService.one(id).patch($scope.storeSubscriptions[index]).then(
        function (success) {
          ToasterService.successHandler("Store", "Approved Successfully.");
          $scope.getStoreSubscriptions();
        }
      );
    }
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

// List Services Controller
app.controller('ListServicesController',
  function ($scope, ServicesService, $modal, ToasterService) {
    ServicesService.one().get().then(
      function (success) {
        $scope.services = success;
      }
    );

    $scope.addService = function () {
      var addServiceModalInstance = $modal.open({
          templateUrl: "add_edit_service",
          controller: "ServiceController",
          size: undefined,
          resolve: {
            id: function () {
              return ""
            }
          }
        }
      );
      addServiceModalInstance.result.then(
        function (service) {
          $scope.services.push(angular.copy(service));
          ToasterService.successHandler("Service", "Added Successfully")
        }
      )
    };

    $scope.editService = function (id, index) {
      var addServiceModalInstance = $modal.open({
          templateUrl: "add_edit_service",
          controller: "ServiceController",
          size: undefined,
          resolve: {
            id: function () {
              return id
            }
          }
        }
      );
      addServiceModalInstance.result.then(
        function (service) {
          $scope.services[index] = angular.copy(service);
          ToasterService.successHandler("Service", "Updated Successfully")
        }
      )
    };

    $scope.deleteService = function (id, index) {
      var addServiceModalInstance = $modal.open({
          templateUrl: "delete_service",
          controller: "ServiceController",
          size: undefined,
          resolve: {
            id: function () {
              return id
            }
          }
        }
      );
      addServiceModalInstance.result.then(
        function () {
          $scope.services.splice(index, 1);
          ToasterService.successHandler("Service", "Deleted Successfully")
        }
      )
    }
  }
);

// Service Controller
app.controller("ServiceController",
  function ($scope, ServicesService, $modalInstance,
            $filter, ResponseHandlerService, id) {

    if (id){
      ServicesService.one(id).get().then(
        function (success) {
          $scope.service = success;
        }
      )
    }

    $scope.save = function () {
      ServicesService.one().customPOST($scope.service).then(
        function (success) {
          $modalInstance.close(success.plain())
        },
        function (error) {
          ResponseHandlerService.errorHandler(error);
        }
      )
    };

    $scope.update = function () {
      ServicesService.one(id).patch($scope.service).then(
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
      ServicesService.one(id).remove().then(
        function (success) {
          $modalInstance.close(success);
        }
      )
    }
  }
);

// List Service Subscription Controller
app.controller('ListServiceSubscriptionsController',
  function ($scope, ServiceSubscriptionsService, $modal, ToasterService, $filter) {

    $scope.status = "pending";

    $scope.getServiceSubscriptions = function () {
      ServiceSubscriptionsService.one().get().then(
        function (success) {
          $scope.allServiceSubscriptions = success;
          $scope.changeStatus();
        }
      );
    };

    $scope.getServiceSubscriptions();

    $scope.changeStatus = function () {
      if($scope.status == 'pending'){
        $scope.serviceSubscriptions = $filter('filter')($scope.allServiceSubscriptions, {'is_approved':false});
      }
      if($scope.status == 'verified'){
        $scope.serviceSubscriptions = $filter('filter')($scope.allServiceSubscriptions, {'is_approved':true});
      }
    };

    $scope.disApprove_service = function (id, index) {
      $scope.serviceSubscriptions[index].is_approved = false;
      ServiceSubscriptionsService.one(id).patch($scope.serviceSubscriptions[index]).then(
        function (success) {
          ToasterService.successHandler("Service", "DisApproved Successfully.");
          $scope.getServiceSubscriptions();
        }
      );
    };

    $scope.Approve_service = function (id, index) {
      $scope.serviceSubscriptions[index].is_approved = true;
      ServiceSubscriptionsService.one(id).patch($scope.serviceSubscriptions[index]).then(
        function (success) {
          ToasterService.successHandler("Service", "Approved Successfully.");
          $scope.getServiceSubscriptions();
        }
      );
    }
  }
);

// List Personal Assistants Controller
app.controller('ListPersonalAssistant',
  function ($scope, PersonalAssistantService) {

    PersonalAssistantService.one().get().then(
      function (success) {
        $scope.personalAssistants = success;
      },
      function (error) {
        console.log(error);
      }
    )
  }
);

app.controller('PAProfileController',
  function($scope, $stateParams, PersonalAssistantService, RoleSubscriptionsService,
           ServiceSubscriptionsService, StoreSubscriptionsService, $filter, ServicesService, ToasterService,
           RolesService, StoresService, UserDetailsService){

    $scope.username=  $stateParams.username;
    $scope.loggedInUser = UserDetailsService.getDetails();

    ServicesService.one().get({'servicesubscription__personal_assistant__user__username':$scope.username}).then(
      function (success) {
        $scope.subscribedService = success;
      },
      function (error) {
        console.log(error);
      }
    );

    PersonalAssistantService.one().get({'user__username':$scope.username}).then(
      function (success) {
        $scope.personalAssistant = success[0];
        $scope.getServiceSubscriptions();
        $scope.getUnAppliedService();
        $scope.getRoleSubscriptions();
        $scope.getUnAppliedRole();
        $scope.getStoreSubscriptions();
        $scope.getUnAppliedStore();
      }
    );

    $scope.getServiceSubscriptions = function () {
      ServiceSubscriptionsService.one().get({'personal_assistant':$scope.personalAssistant.id}).then(
        function (success) {
          $scope.pendingServices = $filter('filter')(success, {'is_approved':false});
          $scope.verifiedServices = $filter('filter')(success, {'is_approved':true});
        }
      )
    };

    $scope.getUnAppliedService = function () {
      ServicesService.one().get().then(
        function (success) {
          $scope.allServices = success;
          $scope.unAppliedServices = $filter('filter')(success, function (value, index, array) {
            return !$filter('filter')($scope.subscribedService, {id:value.id}).length
          })
        }
      );
    };

    $scope.addService = function (id, index) {
      var payload = {'service': id, 'personal_assistant':$scope.personalAssistant.id};
      ServiceSubscriptionsService.one().customPOST(payload).then(
        function (success) {
          ToasterService.successHandler("Service", "Added Successfully.");
          $scope.pendingServices.push(success);
          $scope.unAppliedServices.splice(index, 1);
        }
      )
    };

    $scope.removeService = function (id, index, category) {
      ServiceSubscriptionsService.one(id).remove().then(
        function (success) {
          ToasterService.successHandler("Service", "Removed Successfully.");
          if (category == 'pending'){
            $scope.unAppliedServices.push($scope.pendingServices[index].service_detail);
            $scope.pendingServices.splice(index, 1);
          }
          if (category == 'verified'){
            $scope.unAppliedServices.push($scope.verifiedServices[index].service_detail);
            $scope.verifiedServices.splice(index, 1);
          }
        }
      )
    };

    $scope.approveService = function (serviceSubscription, index) {
      serviceSubscription.is_approved = true;
      ServiceSubscriptionsService.one(serviceSubscription.id).patch(serviceSubscription).then(
        function (success) {
          ToasterService.successHandler("Service", "Approved Successfully.");
          $scope.verifiedServices.push(success);
          $scope.pendingServices.splice(index, 1);
        },
        function (error) {
          console.log(error);
        }
      );
    };

    // Role Tab
    RolesService.one().get({'rolesubscription__personal_assistant__user__username':$scope.username}).then(
      function (success) {
        $scope.subscribedRole = success;
      },
      function (error) {
        console.log(error);
      }
    );

    $scope.getRoleSubscriptions = function () {
      RoleSubscriptionsService.one().get({'personal_assistant':$scope.personalAssistant.id}).then(
        function (success) {
          $scope.pendingRoles = $filter('filter')(success, {'is_approved':false});
          $scope.verifiedRoles = $filter('filter')(success, {'is_approved':true});
        }
      )
    };

    $scope.getUnAppliedRole = function () {
      RolesService.one().get().then(
        function (success) {
          $scope.allRoles = success;
          $scope.unAppliedRoles = $filter('filter')(success, function (value, index, array) {
            return !$filter('filter')($scope.subscribedRole, {id:value.id}).length
          });
        }
      );
    };

    $scope.addRole = function (id, index) {
      var payload = {'role': id, 'personal_assistant':$scope.personalAssistant.id};
      RoleSubscriptionsService.one().customPOST(payload).then(
        function (success) {
          ToasterService.successHandler("Role", "Added Successfully.");
          $scope.pendingRoles.push(success);
          $scope.unAppliedRoles.splice(index, 1);
        }
      )
    };

    $scope.removeRole = function (id, index, category) {
      RoleSubscriptionsService.one(id).remove().then(
        function (success) {
          ToasterService.successHandler("Role", "Removed Successfully.");
          if (category == 'pending'){
            $scope.unAppliedRoles.push($scope.pendingRoles[index].role_detail);
            $scope.pendingRoles.splice(index, 1);
          }
          if (category == 'verified'){
            $scope.unAppliedRoles.push($scope.verifiedRoles[index].role_detail);
            $scope.verifiedRoles.splice(index, 1);
          }
        }
      )
    };

    $scope.approveRole = function (roleSubscription, index) {
      roleSubscription.is_approved = true;
      RoleSubscriptionsService.one(roleSubscription.id).patch(roleSubscription).then(
        function (success) {
          ToasterService.successHandler("Role", "Approved Successfully.");
          $scope.verifiedRoles.push(success);
          $scope.pendingRoles.splice(index, 1);
        }
      );
    };

    // Store Tab
    StoresService.one().get({'storesubscription__personal_assistant__user__username':$scope.username}).then(
      function (success) {
        $scope.subscribedStore = success;
      },
      function (error) {
        console.log(error);
      }
    );

    $scope.getStoreSubscriptions = function () {
      StoreSubscriptionsService.one().get({'personal_assistant':$scope.personalAssistant.id}).then(
        function (success) {
          $scope.pendingStores = $filter('filter')(success, {'is_approved':false});
          $scope.verifiedStores = $filter('filter')(success, {'is_approved':true});
        }
      )
    };

    $scope.getUnAppliedStore = function () {
      StoresService.one().get().then(
        function (success) {
          $scope.allStores = success;
          $scope.unAppliedStores = $filter('filter')(success, function (value, index, array) {
            return !$filter('filter')($scope.subscribedStore, {id:value.id}).length
          });
        }
      );
    };

    $scope.addStore = function (id, index) {
      var payload = {'store': id, 'personal_assistant':$scope.personalAssistant.id};
      StoreSubscriptionsService.one().customPOST(payload).then(
        function (success) {
          ToasterService.successHandler("Store", "Added Successfully.");
          $scope.pendingStores.push(success);
          $scope.unAppliedStores.splice(index, 1);
        }
      )
    };

    $scope.removeStore = function (id, index, category) {
      StoreSubscriptionsService.one(id).remove().then(
        function (success) {
          ToasterService.successHandler("Store", "Removed Successfully.");
          if (category == 'pending'){
            $scope.unAppliedStores.push($scope.pendingStores[index].store_detail);
            $scope.pendingStores.splice(index, 1);
          }
          if (category == 'verified'){
            $scope.unAppliedStores.push($scope.verifiedStores[index].store_detail);
            $scope.verifiedStores.splice(index, 1);
          }
        }
      )
    };

    $scope.approveStore = function (storeSubscription, index) {
      storeSubscription.is_approved = true;
      StoreSubscriptionsService.one(storeSubscription.id).patch(storeSubscription).then(
        function (success) {
          ToasterService.successHandler("Store", "Approved Successfully.");
          $scope.verifiedStores.push(success);
          $scope.pendingStores.splice(index, 1);
        }
      );
    };
  }
);