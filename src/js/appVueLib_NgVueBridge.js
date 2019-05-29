goog.provide('ngVueComponents');
(window['webpackJsonp'] = window['webpackJsonp'] || []).push([[1], {

  /***/ 316:
  /***/ function(module, __webpack_exports__, __webpack_require__) {

    'use strict';
    /* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(62);
    /* harmony import */ var _ngVueBridgeCode_ngVueComponentsModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);
    /* harmony import */ var _vue_components_Greeter_index_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(128);

    _ngVueBridgeCode_ngVueComponentsModule__WEBPACK_IMPORTED_MODULE_1__[/* default */ 'a'].directive('greeter',
        /** @ngInject */
        createVueComponent => createVueComponent(vue__WEBPACK_IMPORTED_MODULE_0__['default'].component('greeter', _vue_components_Greeter_index_vue__WEBPACK_IMPORTED_MODULE_2__[/* default */ 'a'])));

    /***/ },

  /***/ 321:
  /***/ function(module, __webpack_exports__, __webpack_require__) {

    'use strict';
    /* unused harmony export gaGeomUtils */
    /* harmony import */ var _ngVueBridgeCode_ngVueComponentsModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(44);
    /* harmony import */ var _js_ol_geometryUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(127);

    _ngVueBridgeCode_ngVueComponentsModule__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a'].service('gaGeomUtils', _js_ol_geometryUtils_js__WEBPACK_IMPORTED_MODULE_1__[/* GeometryUtils */ 'a']);
    let gaGeomUtils;
    _ngVueBridgeCode_ngVueComponentsModule__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a'].run($injector => {
      gaGeomUtils = $injector.get('gaGeomUtils');
    });

    /***/ },

  /***/ 44:
  /***/ function(module, __webpack_exports__, __webpack_require__) {

    'use strict';
    /* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61);
    /* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__ */__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ var ngVue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(317);
    /* harmony import */ var ngVue__WEBPACK_IMPORTED_MODULE_1___default = /* #__PURE__ */__webpack_require__.n(ngVue__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */ var ngVue_build_plugins_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(320);
    /* harmony import */ var ngVue_build_plugins_js__WEBPACK_IMPORTED_MODULE_2___default = /* #__PURE__ */__webpack_require__.n(ngVue_build_plugins_js__WEBPACK_IMPORTED_MODULE_2__);

    const ngVueComponentsModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngVueComponents', ['ngVue', 'ngVue.plugins']); // goog.module('ngVueComponents');
    // exports = ngVueComponentsModule;

    /* harmony default export */ __webpack_exports__['a'] = (ngVueComponentsModule);

    /***/ }

}]);
