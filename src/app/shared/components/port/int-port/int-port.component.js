'use strict';

class IntPortController {
  constructor($scope) {

    this.isDetailsPanelVisible = false;
    this.scope = $scope;

    this.port = {
      name: 'newIntPort'
    }

    $scope.$on('event:showInfoUpdated', (evt, data) => {
      this.port = Object.assign({}, this.port, data);
    })
  }

  $onInit() {
    this.port = this.data;
  }
}

IntPortController.$inject = [ '$scope' ];

export const IntPortComponent = {
  bindings: {
    data: '<'
  },
  controller: IntPortController,
  template: require('./int-port.component.html')
}