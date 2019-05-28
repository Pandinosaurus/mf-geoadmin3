goog.provide('hello_world_controller');
(function () {
    // 'use strict';

    var module = angular.module('hello_world_controller', []);

    module.controller("HelloWorldCtrl", function($scope) {  
        $scope.message="World" 
    } );
})();