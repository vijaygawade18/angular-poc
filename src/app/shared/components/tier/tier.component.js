'use strict';

class TierComponentController {
  constructor($scope) {

    this.isDetailsPanelVisible = false;
    this.scope = $scope;

    this.tier = {
      name: 'newTier',
      containers: [],
      ports: []
    }

    $scope.$on('event:showInfoUpdated', (evt, data) => {
      this.tier = Object.assign({}, this.tier, data);
    })
  }

  $onInit() {
    this.tier = this.data;
  }

  onDropOverTier(evt, data) {
    let prevObj = this.tier;

    if (data == 'container') {
      prevObj.containers.push({
        name: 'new container',
        image: '',
        volumes: [],
        ports: []
      });
    } else {
      prevObj.ports.push({
        name: `new ${data}`,
        type: data.indexOf('ext') > -1 ? 'ext' : 'int'
      });
    }
    this.tier = Object.assign({}, this.tier, prevObj);
  }

  showDetails() {
    this.isDetailsPanelVisible = !this.isDetailsPanelVisible;

    this.scope.$emit('event:showInfo', {
      type: 'tier',
      data: this.tier,
      isVisible: this.isDetailsPanelVisible
    })
  }

  onPostInformationUpdate() {

  }
}

TierComponentController.$inject = [ '$scope' ];

export const TierComponent = {
  bindings: {
    data: '<',
    tierIndex: '@'
  },
  controller: TierComponentController,
  template: require('./tier.component.html')
}