import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';

import { SHARED_DIRECTIVES } from './shared/directives'
import { SHARED_COMPONENTS } from './shared/components'

import routing from './app.config'

import { appComponent } from './app.component';

import { HomeModule } from './home';

const SHARED_MODULES = [
  'ngComponentRouter',
  ngAnimate,
  HomeModule,
  SHARED_DIRECTIVES,
  SHARED_COMPONENTS
];

export default angular
  .module(window.MODULE_NAME, [ ...SHARED_MODULES ])
  .config(routing)
  .value('$routerRootComponent', 'app')
  .component('app', appComponent)
  .name