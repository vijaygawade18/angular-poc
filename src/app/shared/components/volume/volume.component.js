'use strict';

class VolumeController {
  constructor($scope) {

    this.isDetailsPanelVisible = false;
    this.scope = $scope;

    this.port = {
      name: 'newVolume'
    };

    $scope.$on('event:showInfoUpdated', (evt, data) => {
      this.port = Object.assign({}, this.port, data);
    })
  }

  $onInit(){
    
  }
}

VolumeController.$inject = [ '$scope' ];

export const VolumeComponent = {
  bindings: {
    data: '<'
  },
  controller: VolumeController,
  template: '<div class="volume-icon bounce-down-animation animated"></div>'
}
