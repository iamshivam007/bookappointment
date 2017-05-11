
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

/* UserDetails Service */
app.service('UserDetailsService',
  ['$localStorage',
    function ($localStorage) {
      this.setUID = function (id) {
        $localStorage._uid = id
      };
      this.getUID = function () {
        return $localStorage._uid
      };
      this.setName = function (Name) {
        $localStorage._uname = Name
      };
      this.getName = function () {
        return $localStorage._uname
      };
      this.setRole = function (role) {
        $localStorage._urole = role
      };
      this.getRole = function () {
        return $localStorage._urole
      };
      this.setEmail = function (email) {
        $localStorage._uemail = email
      };
      this.getEmail = function () {
        return $localStorage._uemail
      };
      this.setContact = function (contact) {
        $localStorage._ucontact = contact
      };
      this.getContact = function () {
        return $localStorage._ucontact
      };
      this.setDetails = function (user) {
        return $localStorage._u_details = user
      };
      this.getDetails = function () {
        return $localStorage._u_details
      };
      this.clear = function () {
        delete $localStorage._uid;
        delete $localStorage._uname;
        delete $localStorage._urole;
        delete $localStorage._uemail;
        delete $localStorage._ucontact;
        delete $localStorage._u_details;
      }
    }
  ]
);