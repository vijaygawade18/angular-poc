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

  onDropOverMainContent(evt, data) {
    this.addTier({
      name: 'newTier',
      containers: [],
      ports: []
    })
  }

  onDropOverTier(evt, data) {
    let prevObj = this.tiers[ idx ];
    
    if (data == 'container') {
      prevObj.containers.push({
        name: 'new containers',
        image: '',
        volumes: [],
        ports: []
      });
    } else {
      prevObj.ports.push({
        name: 'new containers'
      });
    }
    this.tiers[ idx ] = Object.assign({}, this.tiers[ idx ], prevObj);
  }
}

HomeController.$inject = [];

export const HomeComponent = {
  controller: HomeController,
  template: require('./home.component.html')
}