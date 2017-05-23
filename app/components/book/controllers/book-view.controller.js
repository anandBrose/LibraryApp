angular.module('book').controller('bookViewController', function($scope, Book, $timeout, $route) {
    var bookViewCtrl = this;

    bookViewCtrl.showProgress = function() {
        bookViewCtrl.showProgress = true;
    }
    bookViewCtrl.hideProgress = function() {
        $timeout(function() {
            bookViewCtrl.showProgress = false;
        }, 500)
    }
    $scope.$on('$viewContentLoaded', function readyToTrick() {
        bookViewCtrl.showProgress();
        Book.get({id:$route.current.params.id},function(book) {
            bookViewCtrl.book = book;
            // bookViewCtrl.book.categories; = bookViewCtrl.book.categories.toString(0);
            bookViewCtrl.hideProgress();
        });
    });
});
