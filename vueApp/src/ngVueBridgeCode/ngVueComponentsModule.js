import angular from 'angular';
import 'ngVue';
import 'ngVue/build/plugins.js';
import store from '@/vue/store';

const ngVueComponentsModule = angular.module('ngVueComponents', ['ngVue', 'ngVue.plugins']);

ngVueComponentsModule.config(($ngVueProvider) => {
    // $ngVueProvider.setRootVueInstanceProps({ router: router });
    $ngVueProvider.setRootVueInstanceProps({ store: store });
});
ngVueComponentsModule.factory('$store', [() => store]);

export default ngVueComponentsModule;