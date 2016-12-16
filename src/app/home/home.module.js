import angular from 'angular';

import { LeftPanelComponent } from './left-panel'
import { RightPanelComponent } from './right-panel'
import { HomeComponent } from './home.component';


let moduleName = `${window.MODULE_NAME}.home`;

export const HomeModule = angular
  .module(moduleName, [])
  .component('left', LeftPanelComponent)
  .component('right', RightPanelComponent)
  .component('home', HomeComponent)
  .name;