'use strict';


import { guid } from '../shared/services'

require('./home.component.css');

class HomeController {

  constructor() {
    this.tiers = [];
    this.vms = [];
  }

  addTier(tier) {
    this.tiers.push(tier);
  }

  removeTier(tier) {

  }

  onDropOverMainContent(evt, data) {
    if (data == 'vm') {
      this.vms.push({
        id: guid(),
        name: 'New York VM',
        type: 'vm',
        volumes: [],
        ports: []
      })
    } else
      this.addTier({
        id: guid(),
        name: 'New Tier',
        type: 'app type',
        replica: 1,
        containers: [],
        ports: []
      })
  }
}

HomeController.$inject = [];

export const HomeComponent = {
  controller: HomeController,
  template: require('./home.component.html')
}
