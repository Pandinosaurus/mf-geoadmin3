import ngVueComponentsModule from '@/ngVueBridgeCode/ngVueComponentsModule';
import { GeometryUtils } from '@/js/ol/geometryUtils.js';

ngVueComponentsModule.service('gaGeomUtils', GeometryUtils);


export let gaGeomUtils;
ngVueComponentsModule.run($injector => {
    gaGeomUtils = $injector.get('gaGeomUtils');
})