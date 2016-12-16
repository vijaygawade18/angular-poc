'use strict';

dropZone.$inject = [ 'draggableFactory', '$compile', '$rootScope' ];

export function dropZone(draggableFactory, $compile, $rootScope) {
  var directive = {
    restrict: 'A',
    controller: dropZoneCtrl,
    controllerAs: 'dc',
    scope: {},
    bindToController: {
      dropZoneHeight: '@',
      dropZoneWidth: '@',
      dragOverStyle: '@'
    },
    link: linkFn
  }
  return directive;

  function dropZoneCtrl() {
    var vm = this;
  }

  function linkFn(scope, element, attr) {
    var dropZoneHeight = attr.dropZoneHeight || 300;
    var dropZoneWidth = attr.dropZoneWidth || 400;
    var dropZoneId = '#' + attr.id;
    var dragOverStyle = attr.dragOverStyle;

    element.css({
      height: dropZoneHeight + 'px',
      width: dropZoneWidth + 'px'
    });

    element.on('dragenter', function () {
      element.addClass(dragOverStyle);
    });

    element.on('dragover', function (event) {
      event.preventDefault();
      element.addClass(dragOverStyle);
    });

    element.on('dragleave', function () {
      element.removeClass(dragOverStyle);
    });

    element.on('drop', function (event) {
      event.preventDefault();
      element.removeClass(dragOverStyle);
      //getting data from droppable element
      var dropMetaData = JSON.parse(event.dataTransfer.getData('obj'));
      var itemType = dropMetaData.elementType;

      var container = document.querySelector(dropZoneId);

      function setPosition() {
        var parentPosition = getPosition(container);
        var mousePositionX = event.clientX - parentPosition.x;
        //console.log("mousePositionX: ",mousePositionX, " event.clientX: ", event.clientX, " parentPosition: ", parentPosition );
        var clonedElementWidth = draggableFactory.clonedElement[ 0 ].clientWidth;
        var mousePositionY = event.clientY - parentPosition.y;
        var clonedElementHeight = draggableFactory.clonedElement[ 0 ].clientHeight;


        draggableFactory.childLeft = mousePositionX - (clonedElementWidth / 2);
        draggableFactory.childTop = mousePositionY - (clonedElementHeight / 2);

        if (draggableFactory.clonedElement.attr('ondropzone')) {
          moveElement(draggableFactory.clonedElement);
          var childTop = draggableFactory.clonedElement[ 0 ].getBoundingClientRect().top;
          var childLeft = draggableFactory.clonedElement[ 0 ].getBoundingClientRect().left;
          var bottom = container.clientHeight - draggableFactory.clonedElement[ 0 ].offsetTop - draggableFactory.clonedElement[ 0 ].clientHeight;
          var right = container.clientWidth - draggableFactory.clonedElement[ 0 ].offsetLeft - draggableFactory.clonedElement[ 0 ].clientWidth;

          function isChildTopGreaterThanParentTop() {
            return (childTop > parentPosition.y);
          }

          function isChildLeftGreaterThanParentLeft() {
            return (childLeft > parentPosition.x);
          }

          if (isChildTopGreaterThanParentTop()) {
            // console.log('childtop is greater than parent top');
          } else {
            draggableFactory.childTop = 10;
            moveElement(draggableFactory.clonedElement);
            // draggableFactory.clonedElement.remove();
          }

          if (isChildLeftGreaterThanParentLeft()) {
            // console.log('childleft is greater than parent left');
          } else {
            draggableFactory.childLeft = 10;
            moveElement(draggableFactory.clonedElement);
          }

          if (bottom <= 0) {
            draggableFactory.childTop = dropZoneHeight - clonedElementHeight;
            moveElement(draggableFactory.clonedElement);
          }

          if (right <= 0) {
            draggableFactory.childLeft = dropZoneWidth - clonedElementWidth;
            moveElement(draggableFactory.clonedElement);
          }

        } else {
          moveElement(draggableFactory.clonedElement);

          scope.$evalAsync(function () {
            //element.append(draggableFactory.clonedElement);
            if (itemType === "tier") {
              $rootScope.$broadcast('event:addTier', itemType)
            }
          });
        }
      }

      setPosition();

      function moveElement(el) {
        el.css({
          position: 'absolute',
          left: draggableFactory.childLeft + 'px',
          top: draggableFactory.childTop + 'px',
          'z-index': '99'
        }).attr('onDropZone', true);
      }

      function getPosition(el) {
        var xPos = 0;
        var yPos = 0;

        while (el) {
          if (el.tagName == "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
          } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
          }

          el = el.offsetParent;
        }
        return {
          x: xPos,
          y: yPos
        };
      }
    });

  }
}

function creteItem(itemType) {
  switch (itemType) {
    case 'tier':
      return '<div class="tier-type" ></div>';

    case 'container':
      return '<div class="container-type"></div>';

    case 'volume':
      return '<div class="volume-type"></div>';

    default:
      return false;
  }

}