'use strict';

/* App Module */

angular.module('SimpleChat', ['simpleChatFilters']).
    config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/chat', {templateUrl: 'templates/chat.html',   controller: chatController}).
    when('/authorize', {templateUrl: 'templates/authorize.html',   controller: authorizeController}).
    otherwise({redirectTo: '/authorize'});
}]).directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13 && !event.shiftKey) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});