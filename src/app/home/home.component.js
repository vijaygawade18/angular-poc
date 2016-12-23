'use strict';


import { guid } from '../shared/services'

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
