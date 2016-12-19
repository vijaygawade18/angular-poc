'use strict';

class ContainerComponentController {
  constructor($scope) {
    this.scope = $scope;

    this.isDetailsPanelVisible = false;

    this.container = {
      name: 'newContainer',
      image: '',
      volumes: []
    }

    $scope.$on('event:showInfoUpdated', (evt, data) => { 
      this.container = Object.assign({}, this.container, data);
    })
  }

  $onInit() { 
    this.container = this.data;
  }

  $onChanges(simpleChange) { 
    if (simpleChange[ 'data' ] && simpleChange[ 'data' ].currentValue) { 
      this.container = simpleChange[ 'data' ].currentValue;
    }
  }

  onContainerImageDrop(evt, index) { 
    this.container.image = '';
  }

  onContainerVolumeDrop(evt, index) { 
    let prevContainer = this.container;
    prevContainer.volumes.push({
      name: '',
      image: ''
    });
    
    this.container = Object.assign({}, this.container, prevContainer);
  }

  showDetails(evt) {
    evt.preventDefault();

    this.isDetailsPanelVisible = !this.isDetailsPanelVisible;

    this.scope.$emit('event:showInfo', {
      type: 'container',
      data: this.container,
      isVisible: this.isDetailsPanelVisible
    })
  }

  showVolumeDetails(evt) {
    evt.preventDefault();

    this.isDetailsPanelVisible = !this.isDetailsPanelVisible;

    this.scope.$emit('event:showInfo', {
      type: 'volume',
      data: this.container.volumes,
      isVisible: this.isDetailsPanelVisible
    })
  }
}

ContainerComponentController.$inject = ['$scope'];

export const ContainerComponent = {
  bindings: {
    data: '<'
  },
  controller: ContainerComponentController,
  template: require('./container.component.html')
}