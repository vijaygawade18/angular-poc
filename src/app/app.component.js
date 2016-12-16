'use strict';

import './app.component.css';

export const appComponent = {
  template: require('./app.component.html'),
  controller: () => { },
  $routeConfig: [
    {
      path: '/',
      name: 'Home',
      component: 'home',
      useAsDefault: true
    }
  ]
}
