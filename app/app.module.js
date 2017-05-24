angular.module('libraryApp', ['ngMaterial', 'ngAnimate','ngRoute', 'ngResource', 'book'])

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
