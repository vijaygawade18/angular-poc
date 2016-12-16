'use strict';

require('./home.component.css');

class HomeController {

  constructor() {
    this.tiers = [];
  }

  addTier(tier) {
    this.tiers.push(tier);
  }

  removeTier(tier) {

  }

  onDrop(evt) {
    this.addTier({
      name: 'newTier',
      containers: [ ],
      ports: []
    })
  }

  onTierDrop(evt, idx) { 
    let prevObj = this.tiers[ idx ];
    prevObj.containers.push({
      name: 'new containers'
    });

    this.tiers[ idx ] = Object.assign({}, this.tiers[ idx ], prevObj);
  }
}

HomeController.$inject = [];

export const HomeComponent = {
  controller: HomeController,
  template: require('./home.component.html')
}