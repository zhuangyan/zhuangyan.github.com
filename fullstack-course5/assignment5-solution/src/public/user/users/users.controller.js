(function () {
"use strict";

angular.module('public')
.controller('UsersController', UsersController);

UsersController.$inject = ['user'];
function UsersController(user) {
  var $ctrl = this;
  $ctrl.user = user;
}

})();
