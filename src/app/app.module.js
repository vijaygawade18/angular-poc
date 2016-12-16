import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';

import routing from './app.config'

import { appComponent } from './app.component';

import { homeComponent } from './home';

const SHARED_MODULES = [
  uiRouter,
  ngAnimate
];

export default angular
  .module(window.MODULE_NAME, [ ...SHARED_MODULES ])
  .config(routing)
  .component('app', appComponent)
  .component('home', homeComponent)
  .name