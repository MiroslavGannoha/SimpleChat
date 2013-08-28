'use strict';

/* Filters */

angular.module('simpleChatFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
}).filter('timeago', function() {
    return function(input) {
        return $.timeago(input);
    };
});