goog.provide('AngularApp');
goog.require('ngVueComponents');
goog.require('hello_world_controller');
(function (app) {
    'use strict';

    angular.module('AngularApp', ['hello_world_controller', 'ngVueComponents']);

})();