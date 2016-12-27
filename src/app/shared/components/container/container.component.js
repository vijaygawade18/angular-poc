'use strict';

import { guid } from '../../services'


const MAX_VOLUME_STACK = 2;
const MAX_VOLUME_SIZE = 16;
const MAX_COLS_PER_ROW = 8;

class ContainerComponentController {
  constructor($scope) {
    this.scope = $scope;

    this.isDetailsPanelVisible = false;

    this.container = {
      id: guid(),
      name: 'newContainer',
      image: '',
      volumes: [],
      ports: []
    }

    this.groupedVolumes = [];

    $scope.$on('event:showInfoUpdated', (evt, data) => {
      this.container = Object.assign({}, this.container, data);
    })
    $scope.$on('event:showInfoDeleted', (evt, data) => {
        this.deleteInfo(data);
    })

  }

  $onInit() {
    this.container = this.data;
  }

  // $onChanges(simpleChange) {
  //   if (simpleChange['data'] && simpleChange['data'].currentValue) {
  //     this.container = simpleChange['data'].currentValue;
  //   }
  // }

  onDropOverContainer(evt, data) {
    let prevContainer = this.container;

    if (data == 'volume') {
      if (prevContainer.volumes.length < MAX_VOLUME_SIZE) {
        prevContainer.volumes.push({
          id: guid(),
          name: 'new volume',
          readonly: false,
          minsize: 0,
          maxsize: 10,
          image: ''
        })

        this.showVolumeDetails();
      }
    }
    else if (data == 'image') {
      prevContainer.image = '';
    } else {
      prevContainer.ports.push({
        id: guid(),
        name: `new ${data}`,
        type: data.indexOf('ext') > -1 ? 'ext' : 'int',
        containerPort: 0,
        servicePort: 0,
        hostPort: 0,
        protocol: 'test'
      })

      this.showPortDetails();
    }

    if (this.groupedVolumes.length <= MAX_VOLUME_STACK) {
      this.container = Object.assign({}, this.container, prevContainer);
      this.totalVolumeSize = this.container.volumes.length;

      this.groupedVolumes = this.groupByRow(prevContainer.volumes, MAX_COLS_PER_ROW);

    }
  }

  deleteInfo(data){
    console.log(data.index);
    this.container.volumes.splice(data.index,1);
    this.totalVolumeSize = this.container.volumes.length;
    if(this.totalVolumeSize == 0){
      return this.groupedVolumes.length = 0;
    }
  }

  showVolumeDetails(event) {
    this.isDetailsPanelVisible = true;

    this.scope.$emit('event:showInfo', {
      type: 'volume',
      data: this.container.volumes,
      isVisible: this.isDetailsPanelVisible
    })
    this.stopEventPropogation(event);
  }

  showPortDetails(event) {
    this.isDetailsPanelVisible = true;
    this.scope.$emit('event:showInfo', {
      type: 'port',
      data: this.container.ports,
      isVisible: this.isDetailsPanelVisible
    })
    this.stopEventPropogation(event);
  }
  // To stop event propogation
  stopEventPropogation(event) {
    if(!!event){
      event.stopPropagation();
      event.preventDefault();
    }
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

ContainerComponentController.$inject = ['$scope'];

export const ContainerComponent = {
  bindings: {
    data: '<'
  },
  controller: ContainerComponentController,
  template: require('./container.component.html')
}
