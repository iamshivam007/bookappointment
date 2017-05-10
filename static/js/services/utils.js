
/* Toaster Service */
app.service('ToasterService',
  function (toaster) {
    this.successHandler = function (title, message) {
      return toaster.pop('success', title, message);
    };
    this.errorHandler = function (title, message) {
      return toaster.pop('error', title, message);
    }
  }
);

/* Response Handler Service */
app.service('ResponseHandlerService',
  function (ToasterService) {
    this.successHandler = function (response) {
      if (response.success instanceof Array){
        ToasterService.successHandler('Success', response.success[0]);
      }else{
        ToasterService.successHandler('Success', response.success);
      }
    };
    this.errorHandler = function (response) {
      for (var data in response.data){
        if (response.data.hasOwnProperty(data)){
          if (data == 'non_field_errors'){
            ToasterService.errorHandler('Error', response.data[data][0])
          }else {
            ToasterService.errorHandler(data, message=response.data[data][0])
          }
        }
      }
    }
  }
);

/* User Details Service */
app.service('UserDetailsService',
  ['$localStorage',
    function ($localStorage) {
      this.setUID = function (id) {
        $localStorage._uid = id
      };
      this.getUID = function () {
        return $localStorage._uid
      };
      this.setFirstName = function (firstName) {
        $localStorage._ufirstname = firstName
      };
      this.getFirstName = function () {
        return $localStorage._ufirstname
      };
      this.setLastName = function (lastName) {
        $localStorage._ulastname = lastName
      };
      this.getLastName = function () {
        return $localStorage._ulastname
      };
      this.setProfilePic = function (pic) {
        $localStorage._uprofilepic = pic
      };
      this.getProfilePic = function () {
        return $localStorage._uprofilepic
      };
      this.setIsPublisher = function (ispublisher) {
        $localStorage._uispublisher = ispublisher
      };
      this.getIsPublisher = function () {
        return $localStorage._uispublisher
      };
      this.setEmail = function (email) {
        $localStorage._uemail = email
      };
      this.getEmail = function () {
        return $localStorage._uemail
      };
      this.clear = function () {
        delete $localStorage._uid;
        delete $localStorage._ufirstname;
        delete $localStorage._ulastname;
        delete $localStorage._uprofilepic;
        delete $localStorage._uispublisher;
        delete $localStorage._uemail;
      }
    }
  ]
);