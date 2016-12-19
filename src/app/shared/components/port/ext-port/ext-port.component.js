'use strict';

class ExtPortController {
  constructor($scope) {

    this.isDetailsPanelVisible = false;
    this.scope = $scope;

    this.port = {
      name: 'newExtPort'
    }

    $scope.$on('event:showInfoUpdated', (evt, data) => {
      this.port = Object.assign({}, this.port, data);
    })
  }

  $onInit() {
    this.port = this.data;
  }
}

ExtPortController.$inject = [ '$scope' ];

export const ExtPortComponent = {
  bindings: {
    data: '<'
  },
  controller: ExtPortController,
  template: require('./ext-port.component.html')
}