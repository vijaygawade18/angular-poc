export function droppable(draggableFactory, $compile) {
  var directive = {
    restrict: 'A',
    compile: compileFn

  }
  return directive;

  function compileFn(element) {
    element.prop('draggable', true);
    return linkFn;
  }

  function linkFn(scope, element, attr, ctrl) {
    console.log(attr.elementType);
    element.on('dblclick', function () {
      if (attr.ondropzone) {
        element.remove();
      }
    });

    element.on('dragstart', function (event) {
      var sampleData = {
        "id": this.id,
        "elementType": attr.elementType
      };
      event.dataTransfer.setData('obj', JSON.stringify(sampleData));
      event.dataTransfer.setData('Text', "ranjan");
      event.dataTransfer.setData('Text', "kumar");
      if (attr.ondropzone) {
        draggableFactory.clonedElement = element;
      } else {
        draggableFactory.clonedElement = element.clone();
      }
    });

  }
}

droppable.$inject = ['draggableFactory', '$compile'];