import template from '@/DEV/AngularAppWrapper/index.html';

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