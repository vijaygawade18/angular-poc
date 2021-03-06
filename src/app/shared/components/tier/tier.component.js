'use strict';

import { guid } from '../../services'

class TierComponentController {
  constructor($scope) {
    this.isDetailsPanelVisible = false;
    this.scope = $scope;

    this.tier = {
      id: guid(),
      name: 'newTier',
      containers: [],
      ports: []
    }

    $scope.$on('event:showInfoUpdated', (evt, data) => {
      this.tier = Object.assign({}, this.tier, data);
    });

  }

  $onInit() {
    this.tier = this.data;
    this.showDetails();
  }

  onDropOverTier(evt, data) {
    let prevObj = this.tier;
    
    if (data == 'container') {
      this.tier.containers.push({
        id: guid(),
        name: 'new container',
        image: '',
        volumes: [],
        ports: []
      });

      this.showContainerDetails();
    } else {
      this.tier.ports.push({
        id: guid(),
        name: `new ${data}`,
        type: data.indexOf('ext') > -1 ? 'ext' : 'int',
        containerPort: 0,
        servicePort: 0,
        hostPort: 0,
        protocol: 'test'
      });

      this.showPortDetails();
    }

    //this.tier = Object.assign({}, this.tier, prevObj);
  }

  showDetails(event) {
    this.isDetailsPanelVisible = true;
    this.scope.$emit('event:showInfo', {
      type: 'tier',
      data: this.tier,
      isVisible: this.isDetailsPanelVisible
    })
    this.stopEventPropogation(event);
  }

  showContainerDetails(event) {
    this.isDetailsPanelVisible = true;
    this.scope.$emit('event:showInfo', {
      type: 'container',
      data: this.tier.containers,
      isVisible: this.isDetailsPanelVisible
    })
    this.stopEventPropogation(event);
  }

  showPortDetails(event) {
    this.isDetailsPanelVisible = true;
    this.scope.$emit('event:showInfo', {
      type: 'port',
      data: this.tier.ports,
      isVisible: this.isDetailsPanelVisible
    })
    this.stopEventPropogation(event);
  }

  stopEventPropogation(event) {
      if(!!event){
        event.stopPropagation();
        event.preventDefault();
      }
  }

}

TierComponentController.$inject = ['$scope'];

export const TierComponent = {
  bindings: {
    data: '<',
    tierIndex: '@'
  },
  controller: TierComponentController,
  template: require('./tier.component.html')
}
