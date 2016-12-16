'use strict';

require('./home.component.css');

class HomeController {

  constructor($scope) {
    this.tiers = [];

    $scope.$on('event:addTier', () => {
      this.addTier({
        name: 'newTier',
        containers: [ {
          name: 'newContainer'
        }],
        ports: []
      })
    });
  }

  addTier(tier) {
    this.tiers.push(tier);
  }

  removeTier(tier) {

  }

}

HomeController.$inject = [ '$scope' ]

export const HomeComponent = {
  controller: HomeController,
  template: require('./home.component.html')
}