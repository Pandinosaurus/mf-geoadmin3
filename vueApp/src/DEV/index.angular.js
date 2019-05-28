// a bunch of useful imports
import '@babel/polyfill';
// import '@/assets/styles/index.scss';
import angular from 'angular';
// import the wrapper component created above
import AngularAppWrapper from '@/DEV/webpackAngularApp/index.js';
import '@/ngVueBridgeCode/ngVueDirectives.js';
import ngVueComponentsModule from '@/ngVueBridgeCode/ngVueComponentsModule.js';

// init an Angular app
angular.module('ngVueApp', [ngVueComponentsModule.name]);
// set AngularAppWrapper as an Angular component
angular.module('ngVueApp').component('angularAppWrapper', AngularAppWrapper);

// set app template
const wrapperEl = document.querySelector('#app');
wrapperEl.insertAdjacentHTML('afterbegin', '<angular-app-wrapper></angular-app-wrapper>');

// manually bootstrap Angular app
angular.bootstrap(wrapperEl, ['ngVueApp'], { strictDi: false });