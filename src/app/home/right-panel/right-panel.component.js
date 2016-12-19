'use strict';

// require('./right-panel.component.css');

class RightPanelController {

  constructor($rootScope) {
    this.isVisible = false;

    this.currentTpl = '';
    this.templateData = '';

    $rootScope.$on('event:showInfo', (evt, args) => {
      let { type, data, isVisible } = args;
      
      this.isVisible = isVisible;
      if (!this.isVisible) return;

      this.templateData = data;
      this.currentTpl = this.getTemplateByType(type);
    });
  }

  getTemplateByType(type) { 
    let template = '';
    switch (type) { 
      case 'tier':
        template = 'tier-info.html'
        break;
      case 'container':
        template = 'container-info.html'
        break;
      case 'volume':
        template = 'volume-info.html'
        break;
      default:
        template = 'tier-info.html';
        break;
    }

    return template
  }

  onInformationUpdate(data) {
    $rootScope.$broadcast('event:showInfoUpdated', data);
  }
}

RightPanelController.$inject = [ '$rootScope' ];

export const RightPanelComponent = {
  template: require('./right-panel.component.html'),
  controller: RightPanelController
}