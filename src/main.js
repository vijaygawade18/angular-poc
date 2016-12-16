import angular from 'angular';

import AppModule from './app/app.module'

//bootstraping
angular.element(document)
  .ready(() => {
    angular.bootstrap(document, [ AppModule ])
  });