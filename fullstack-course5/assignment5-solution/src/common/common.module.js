(function() {
"use strict";

angular.module('common', [])
<<<<<<< HEAD
.constant('ApiPath', 'https://luiz-angular-coursera.herokuapp.com')
=======
.constant('ApiPath', 'https://aleksandar-gjorgievski.herokuapp.com')
>>>>>>> 62bfc64f12c9cd56ba3d653a9bf17dfdaa30103c
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
