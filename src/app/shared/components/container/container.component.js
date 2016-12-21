'use strict';

class ContainerComponentController {
  constructor($scope) {
    this.scope = $scope;

    this.isDetailsPanelVisible = false;

    this.container = {
      name: 'newContainer',
      image: '',
      volumes: [],
      ports: []
    }

    this.groupedVolumes = [];

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

  onDropOverContainer(evt, data) {

    let prevContainer = this.container;

    if (data == 'volume') {
      if(prevContainer.volumes.length <= 15){
        prevContainer.volumes.push({
          name: 'new volume',
          readonly: false,
          minsize: 0,
          maxsize: 10,
          image: ''
        })
      }
    }
    else if (data == 'image') {
      prevContainer.image = '';
    } else {
      prevContainer.ports.push({
        name: `new ${data}`,
        type: data.indexOf('ext') > -1 ? 'ext' : 'int',
        containerPort: 0,
        servicePort: 0,
        hostPort: 0,
        protocol: 'test'
      })
    }

    if(this.groupedVolumes.length < 3) {
      this.container = Object.assign({}, this.container, prevContainer);
      this.groupedVolumes = this.groupByRow(this.container.volumes);
    }

  }


  showVolumeDetails(evt) {
    evt.preventDefault();

    this.isDetailsPanelVisible = true;

    this.scope.$emit('event:showInfo', {
      type: 'volume',
      data: this.container.volumes,
      isVisible: this.isDetailsPanelVisible
    })
    evt.stopPropagation();
  }

  showPortDetails(evt) {
    evt.preventDefault();

    this.isDetailsPanelVisible = true;
    this.scope.$emit('event:showInfo', {
      type: 'port',
      data: this.container.ports,
      isVisible: this.isDetailsPanelVisible
    })
    evt.stopPropagation();
  }

  groupByRow(data, numberOfColPerRow = 4) {
    let newArr = [];

    if (data.length < numberOfColPerRow) {
      newArr.push(data)
    }
    else
      for (let i = 0; i < data.length; i += numberOfColPerRow) {
        newArr.push(data.slice(i, i + numberOfColPerRow));
      }

    return newArr;
  }
}

ContainerComponentController.$inject = [ '$scope' ];

export const ContainerComponent = {
  bindings: {
    data: '<'
  },
  controller: ContainerComponentController,
  template: require('./container.component.html')
}
