(function () {
"use strict";

angular.module('public')
.component('userInfo', {
  templateUrl: 'src/public/user/userInfo/user-info.html',
  bindings: {
    user: '<'
  },
  controller: UserInfoController
});


UserInfoController.$inject = ['ApiPath'];
function UserInfoController(ApiPath) {
  var $ctrl = this;
  $ctrl.basePath = ApiPath;
}

})();
