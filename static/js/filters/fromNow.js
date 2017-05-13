
'use strict';

app.filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    }
  }
);

app.filter('timeFilter', function ($filter) {
  return function (time) {
    if (!Date.prototype.isPrototypeOf(time)){
      var parts = time.split(':');
      var date = new Date(0, 0, 0, parts[0], parts[1], parts[2]);
      return $filter('date')(date, 'H:mm');
    }
    return $filter('date')(time, 'H:mm');
  };
});