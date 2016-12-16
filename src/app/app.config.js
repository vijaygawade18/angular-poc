export default function routing($locationProvider) {
  $locationProvider.html5Mode(true);
}

routing.$inject = [ '$locationProvider' ];