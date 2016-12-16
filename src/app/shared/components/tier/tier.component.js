'use strict';

class TierComponentController {
  constructor() {
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

  onContainerDrop(evt) { }
}

TierComponentController.$inject = [];

export const TierComponent = {
  bindings: {
    data: '<'
  },
  controller: TierComponentController,
  template: require('./tier.component.html')
}