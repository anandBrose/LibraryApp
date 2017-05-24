angular.module('libraryApp', ['ngMaterial', 'ngAnimate', 'ngRoute', 'ngResource', 'book'])
    .run(function($rootScope, $timeout) {
        $rootScope.globals = {}
        $rootScope.globals.showProgressLoader = function() {
            $rootScope.showProgress = true;
        }
        $rootScope.globals.hideProgressLoader = function() {
            $timeout(function() {
                $rootScope.showProgress = false;
            }, 500)
        }
    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'components/book/templates/book-landing-page.html',
                controller: 'bookListController',
                controllerAs: 'bookCtrl'
            })
            .when('/book/:id', {
                templateUrl: 'components/book/templates/book-view-page.html',
                controller: 'bookViewController',
                controllerAs: 'bookViewCtrl'
            });
    });
