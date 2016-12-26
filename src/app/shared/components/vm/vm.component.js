'use strict';

import { guid } from '../../services'

const MAX_VOLUME_STACK = 2;
const MAX_VOLUME_SIZE = 16;
const MAX_COLS_PER_ROW = 8;

class VMComponentController {
    constructor($scope) {
        this.isDetailsPanelVisible = false;
        this.scope = $scope;

        this.vm = {
            id: guid(),
            name: 'newVM',
            volumes: [],
            ports: []
        }

        this.groupedVolumes = [];

        $scope.$on('event:showInfoUpdated', (evt, data) => {
            this.tier = Object.assign({}, this.tier, data);
        })
    }

    $onInit() {
        this.vm = this.data;
    }

    onDropOverVM(evt, data) {
        let prevVM = this.vm;

        if (data == 'volume') {
            if (prevVM.volumes.length < MAX_VOLUME_SIZE) {
                prevVM.volumes.push({
                    id: guid(),
                    name: 'new volume',
                    readonly: false,
                    minsize: 0,
                    maxsize: 10,
                    image: ''
                })
            }
        } else {
            prevVM.ports.push({
                id: guid(),
                name: `new ${data}`,
                type: data.indexOf('ext') > -1 ? 'ext' : 'int',
                containerPort: 0,
                servicePort: 0,
                hostPort: 0,
                protocol: 'test'
            });
        }

        if (this.groupedVolumes.length <= MAX_VOLUME_STACK) {
            this.vm = Object.assign({}, this.vms, prevVM);
            this.totalVolumeSize = this.vm.volumes.length;

            this.groupedVolumes = this.groupByRow(prevVM.volumes, MAX_COLS_PER_ROW);
        }
    }

    showDetails() {
        this.isDetailsPanelVisible = true;
        this.scope.$emit('event:showInfo', {
            type: 'vm',
            data: this.vm,
            isVisible: this.isDetailsPanelVisible
        })
    }


    showVolumeDetails(evt) {
        evt.preventDefault();

        this.isDetailsPanelVisible = true;

        this.scope.$emit('event:showInfo', {
            type: 'volume',
            data: this.container.volumes,
            isVisible: this.isDetailsPanelVisible
        })
        evt.stopPropagation();
    }

    showPortDetails(evt) {
        evt.preventDefault();

        this.isDetailsPanelVisible = true;
        this.scope.$emit('event:showInfo', {
            type: 'port',
            data: this.container.ports,
            isVisible: this.isDetailsPanelVisible
        })
        evt.stopPropagation();
    }

    groupByRow(data, numberOfColPerRow = 4) {
        let newArr = [];

        if (data.length < numberOfColPerRow) {
            newArr.push(data)
        }
        else
            for (let i = 0; i < data.length; i += numberOfColPerRow) {
                newArr.push(data.slice(i, i + numberOfColPerRow));
            }

        return newArr;
    }
}

VMComponentController.$inject = ['$scope'];

export const VMComponent = {
    bindings: {
        data: '<',
        vmIndex: '@'
    },
    controller: VMComponentController,
    template: require('./vm.component.html')
}
