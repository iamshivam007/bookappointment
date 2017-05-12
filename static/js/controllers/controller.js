app.controller('ListStoreController',
  function ($scope, StoresService) {
    StoresService.one().get().then(
      function (success) {
        $scope.stores = success;
      }
    )
  }
);