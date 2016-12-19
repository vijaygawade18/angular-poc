'use strict';

class VolumeController {
  constructor($scope) {

    this.isDetailsPanelVisible = false;
    this.scope = $scope;

    this.port = {
      name: 'newVolume'
    }

    $scope.$on('event:showInfoUpdated', (evt, data) => {
      this.port = Object.assign({}, this.port, data);
    })
  }

  $onInit() {
    this.port = this.data;
  }
}

VolumeController.$inject = [ '$scope' ];

export const VolumeComponent = {
  bindings: {
    data: '<'
  },
  controller: VolumeController,
  template: require('./volume.component.html')
}