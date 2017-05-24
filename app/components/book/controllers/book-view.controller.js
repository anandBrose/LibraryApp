angular.module('book').controller('bookViewController', function($scope, Book, $timeout, $route, $mdDialog) {
    var bookViewCtrl = this;

    bookViewCtrl.showProgress = function() {
        $scope.$root.showProgress = true;
    }
    bookViewCtrl.hideProgress = function() {
        $timeout(function() {
            $scope.$root.showProgress = false;
        }, 500)
    }
    bookViewCtrl.showConfirm = function(ev, book) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete this product?')
            .textContent('This cannot be undone!')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('no');

        $mdDialog.show(confirm).then(function() {
            book.$delete_book({ id: $route.current.params.id });
        }, function() {});
    };
    bookViewCtrl.updateBook = function(ev, book) {
        $mdDialog.show({
                controller: 'bookAddController',
                templateUrl: 'components/book/templates/book-add-dialog.html',
                parent: angular.element(document.body),
                locals: {
                    dialogData: {
                        book: angular.copy(book),
                        mode: "update"
                    }
                },
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };
    $scope.$on('$viewContentLoaded', function readyToTrick() {
        bookViewCtrl.showProgress();
        Book.get({ id: $route.current.params.id }, function(book) {
            bookViewCtrl.book = book;
            // bookViewCtrl.book.categories; = bookViewCtrl.book.categories.toString(0);
            bookViewCtrl.hideProgress();
        });
    });
});
