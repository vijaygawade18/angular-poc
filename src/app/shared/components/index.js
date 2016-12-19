import angular from 'angular';

import { ContainerComponent } from './container';
import { PORT_MODULES } from './port';
import { TierComponent } from './tier';
import { VolumeComponent } from './volume';

const SHARED_COMPONENTS_MODULE = [
  PORT_MODULES
]

export const SHARED_COMPONENTS = angular
  .module(`${window.MODULE_NAME}.shared_components`, [
    ...SHARED_COMPONENTS_MODULE
  ])
  .component('container', ContainerComponent)
  .component('tier', TierComponent)
  .component('volume', VolumeComponent)
  .name;