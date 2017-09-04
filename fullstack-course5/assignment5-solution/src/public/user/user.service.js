(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);


UserService.$inject = ['$http', 'ApiPath'];
function UserService($http, ApiPath) {
  var service = this;
  service.user = { }

  service.signup = function (newUser) {
  	service.user.firstName = newUser.firstName;
  	service.user.lastName = newUser.lastName;
  	service.user.email = newUser.email;
  	service.user.phone = newUser.phone;
  	// service.user.favDish = newUser.favDish;
  }

  service.exist = function (menuItemShortName){
  	return $http.get(ApiPath + "/menu_items/" + menuItemShortName + ".json").then(function(response){
      service.user.favDish = response.data;
    });
  }
}



})();