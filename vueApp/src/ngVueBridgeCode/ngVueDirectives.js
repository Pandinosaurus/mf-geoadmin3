import Vue from 'vue';
import ngVueComponentsModule from '@/ngVueBridgeCode/ngVueComponentsModule';
import Greeter from '@/vue/components/Greeter/index.vue';

ngVueComponentsModule.directive('vueAppContainer',
    /** @ngInject */
    createVueComponent => createVueComponent(Vue.component('Greeter', Greeter))
);