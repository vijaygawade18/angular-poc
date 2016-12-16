import angular from 'angular';

import { draggableFactory } from './shared';
import { dropZone } from './drop-zone.directive';
import { droppable } from './droppable.directive';

export const DragAndDropModule = angular
  .module(`${window.MODULE_NAME}.drag_and_drop`, [])
  .directive('dropZone', dropZone)
  .directive('droppable', droppable)
  .factory('draggableFactory', draggableFactory)
  .name;