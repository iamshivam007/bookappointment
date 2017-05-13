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
  function ($scope, AppointmentsService, $filter) {
    AppointmentsService.one().get().then(
      function (success) {
        $scope.appointments = success;
        console.log(success.plain());
      }
    )
  }
);