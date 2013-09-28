angular.module('baseline.about', [
    'ui.router'
])

    .config(['$stateProvider', function( $stateProvider ) {
        $stateProvider.state('about', {
            url: '/about',
            controller: 'AboutCtrl',
            templateUrl: 'about/about.tpl.html'
        });
    }])

    .controller('AboutCtrl', ['$scope', function($scope) {

    }]);
