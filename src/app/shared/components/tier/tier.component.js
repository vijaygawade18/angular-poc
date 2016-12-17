'use strict';

class TierComponentController {
  constructor() {
    this.showInformation = false;
    this.tier = {
      name: 'newTier',
      containers: [],
      ports: []
    }
  }

  $onInit() { 
    this.tier = this.data;
  }

  $onChanges(simpleChange) { 
    if (simpleChange[ 'data' ] && simpleChange[ 'data' ].currentValue) { 
      this.tier = simpleChange[ 'data' ].currentValue;
    }
  }
}

TierComponentController.$inject = [];

export const TierComponent = {
  bindings: {
    data: '<',
    tierIndex: '@'
  },
  controller: TierComponentController,
  template: require('./tier.component.html')
}