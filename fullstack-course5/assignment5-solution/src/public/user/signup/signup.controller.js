(function () {
"use strict";

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['UserService'];
function RegistrationController(UserService) {
  var $ctrl = this;
  $ctrl.user = {}

  $ctrl.validateFavDish = function (nextKey) {
  	UserService.exist($ctrl.user.favDish + nextKey.key).then(function (response) {
      	$ctrl.invalidFavDish = false;
    }, function(response) {
    	$ctrl.invalidFavDish = true;
    });
  }

  $ctrl.submit = function () {
    var fakenext = {
      key:""
    };
    $ctrl.validateFavDish(fakenext);
  	UserService.signup($ctrl.user);
    $ctrl.saved = true;
  };
}


})();
