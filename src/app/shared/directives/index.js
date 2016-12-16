import angular from 'angular';

import { DragAndDropModule } from './drag-and-drop';

const SHARED_DIRECTIVES_MODULE = [
  DragAndDropModule
]

export const SHARED_DIRECTIVES = angular
  .module(`${window.MODULE_NAME}.shared_directives`, [
    ...SHARED_DIRECTIVES_MODULE
  ])
  .name;