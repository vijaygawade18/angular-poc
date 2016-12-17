'use strict';

class ContainerComponentController {
  constructor() {
    this.container = {
      name: 'newContainer',
      image: '',
      volumes: []
    }
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
}

ContainerComponentController.$inject = [];

export const ContainerComponent = {
  bindings: {
    data: '<'
  },
  controller: ContainerComponentController,
  template: require('./container.component.html')
}