import angular from 'angular';

import { TierComponent } from './tier';

const SHARED_COMPONENTS_MODULE = [
  
]

export const SHARED_COMPONENTS = angular
  .module(`${window.MODULE_NAME}.shared_components`, [
    ...SHARED_COMPONENTS_MODULE
  ])
  .component('tier', TierComponent)
  .name;