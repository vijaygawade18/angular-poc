'use strict';

export const TierComponent = {
  bindings: {
    data: '<'
  },
  controller: TierComponentController,
  template: require('./tier.component.html')
}

class TierComponentController {
  constructor() {
    this.tier = {
      name: 'newTier',
      containers: [],
      ports: []
    }
  }

  $onInit() { 
    this.tier = angular.copy(this.data, this.tier);
  }
}

TierComponentController.$inject = [];