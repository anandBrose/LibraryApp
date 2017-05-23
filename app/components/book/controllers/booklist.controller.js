angular.module('book').controller('bookListController', function($scope, Book, $timeout) {
    var bookCtrl = this;

    bookCtrl.showProgress = function() {
        bookCtrl.showProgress = true;
    }
    bookCtrl.hideProgress = function() {
        $timeout(function() {
            bookCtrl.showProgress = false;
        }, 500)
    }
    $scope.$on('$viewContentLoaded', function readyToTrick() {
        bookCtrl.showProgress();
        Book.query(function(entries) {
            bookCtrl.books = entries;
            bookCtrl.hideProgress();
        });
    });
});
