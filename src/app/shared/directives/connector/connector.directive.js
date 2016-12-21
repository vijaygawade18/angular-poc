'use strict';

import angular from 'angular';

import { connectElements } from './connector.service';

class ConnectorController {

    constructor() {
        this.draw = false;
    }

    createPath(svg) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svg.appendChild(path)
        return path;
    }

}

ConnectorController.$inject = []

export const ConnectorDirective = () => {
    return {
        restrict: 'A',
        scope: {
            draw: '@'
        },
        link: function (scope, ele, attrs, ctrl) {
            debugger;
            attrs.$observe('draw', (drawConnector = false) => {
                if (drawConnector == 'true') {
                debugger;
                let svg = ele.querySelector('.connector')
                    // let svg = angular.element(ele).find('.connector');
                    // let tier = angular.element(ele).find('tier');
                    // let network = angular.element(ele).find('network');
                    // let path = ctrl.createPath(angular.element(ele).find('.connector'));

                    // connectElements(ele, svg, path, network, tier )
                }
            })
        }
    }
}