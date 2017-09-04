(function () {
"use strict";

angular.module('public')
.directive('onKeypress', onKeypress);

function onKeypress() {
    return {
        scope: {
            handler: '&onKeypress'
        },
        link: function(scope, element) {
            element.bind('keydown', function(e) {
                scope.handler({$event: e});
            });
        }
    };
};

})();