import template from '@/DEV/webpackAngularApp/index.html';

export default {
    template: template,
    controller: class AngularAppWrapperController {
        /** @ngInject */
        constructor() {
            this.internalString = '';
        }

        $onInit() {
            this.internalString = 'Angular App Container Ready!';
        }
    }
};