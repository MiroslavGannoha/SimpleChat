'use strict';

/* App Module */

angular.module('SimpleChat', []).
    config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/chat', {templateUrl: 'templates/chat.html',   controller: chatController}).
    otherwise({redirectTo: '/chat'});
}]);