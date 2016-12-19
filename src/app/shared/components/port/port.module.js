'use strict';

import angular from 'angular';

import { PortComponent } from './port.component'
import { IntPortComponent } from './int-port';
import { ExtPortComponent } from './ext-port';


export const PORT_MODULES = angular
  .module(`${window.MODULE_NAME}.port_module`, [
  ])
  .component('port', PortComponent)
  .component('extPort', ExtPortComponent)
  .component('intPort', IntPortComponent)
  .name;