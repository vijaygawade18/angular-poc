import angular from 'angular';

import { ConnectorDirective } from './connector'

const SHARED_DIRECTIVES_MODULE = [
]

export const SHARED_DIRECTIVES = angular
  .module(`${window.MODULE_NAME}.shared_directives`, [
    ...SHARED_DIRECTIVES_MODULE
  ])
  .directive('connector', ConnectorDirective)
  .name;