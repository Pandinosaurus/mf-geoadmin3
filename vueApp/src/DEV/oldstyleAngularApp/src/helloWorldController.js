goog.provide('hello_world_controller');
goog.require('ngVueComponents');
(function () {
    // 'use strict';

    var module = angular.module('hello_world_controller', ['ngVueComponents']);

    module.controller("HelloWorldCtrl", function($scope, gaGeomUtils) {  
        $scope.message = gaGeomUtils.demo("World")
    } );
})();