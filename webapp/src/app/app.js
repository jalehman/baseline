angular.module('baseline', [
    'templates-app',
    'templates-common',
    'baseline.about',
    'ui.router'
])

    .config(['$urlRouterProvider', '$locationProvider', function($urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        //CHANGE THE DEFAULT ROUTE...when there's one to change it to.
        $urlRouterProvider.otherwise("/");

    }])

    .controller('AppCtrl', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope, pendingServerInteractions, security) {
        $scope.dummy = "baseline";
    }]);
