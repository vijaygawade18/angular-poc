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

  $onChanges(simpleChange) { 
    if (simpleChange[ 'data' ] && simpleChange[ 'data' ].currentValue) { 
      this.tier = simpleChange[ 'data' ].currentValue;
    }
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

TierComponentController.$inject = ['$scope'];

export const TierComponent = {
  bindings: {
    data: '<',
    tierIndex: '@'
  },
  controller: TierComponentController,
  template: require('./tier.component.html')
}