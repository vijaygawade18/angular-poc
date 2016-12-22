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

  updateConnectingLines() {
    
  }

  onDropOverTier(evt, data) {
    let prevObj = this.tier;
    this.updateConnectingLines();
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
        type: data.indexOf('ext') > -1 ? 'ext' : 'int',
        containerPort: 0,
        servicePort: 0,
        hostPort: 0,
        protocol: 'test'
      });
    }

    this.tier = Object.assign({}, this.tier, prevObj);
  }

  showDetails() {
    this.isDetailsPanelVisible = true;
    this.scope.$emit('event:showInfo', {
      type: 'tier',
      data: this.tier,
      isVisible: this.isDetailsPanelVisible
    })
  }

  showContainerDetails(evt) {
    evt.preventDefault();
    this.isDetailsPanelVisible = true;
    this.scope.$emit('event:showInfo', {
      type: 'container',
      data: this.tier.containers,
      isVisible: this.isDetailsPanelVisible
    })

    evt.stopPropagation();
  }

  showDetails() {
    this.isDetailsPanelVisible = !this.isDetailsPanelVisible;

    this.scope.$emit('event:showInfo', {
      type: 'tier',
      data: this.tier,
      isVisible: this.isDetailsPanelVisible
    })
  }

  showPortDetails(evt) {
    evt.preventDefault();

    this.isDetailsPanelVisible = true;
    this.scope.$emit('event:showInfo', {
      type: 'port',
      data: this.tier.ports,
      isVisible: this.isDetailsPanelVisible
    })
    evt.stopPropagation();
  }

  onPostInformationUpdate() {

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
