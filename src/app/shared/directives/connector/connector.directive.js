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
        bindToController: true,
        controller: ConnectorController,
        link: function (scope, ele, attrs, ctrl) {
            attrs.$observe('draw', (drawConnector = false) => {
                if (drawConnector == 'true') {
                    debugger;
                    let parentEle = ele[0];

                    let svg = angular.element(document.querySelector('.connector'));

                    let tier = angular.element(parentEle.querySelector('.tier-wrapper'));

                    let network = angular.element(parentEle.querySelector('.network-block'));

                    let svgContainer = angular.element(document.querySelector('.middle-section'))

                    let path = ctrl.createPath(svg[0]);

                    connectElements(svgContainer[0], svg[0], path, network[0], tier[0])
                }
            })
        }
    }
}