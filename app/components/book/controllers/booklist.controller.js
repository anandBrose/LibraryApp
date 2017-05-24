angular.module('book').controller('bookListController', function($scope, Book, $timeout, $mdDialog) {
    var bookCtrl = this;

    bookCtrl.showProgress = function() {
        $scope.$root.showProgress = true;
    }
    bookCtrl.hideProgress = function() {
        $timeout(function() {
            $scope.$root.showProgress = false;
        }, 500)
    }
    bookCtrl.addBook = function(ev) {
        $mdDialog.show({
                controller: 'bookAddController',
                templateUrl: 'components/book/templates/book-add-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    dialogData: {
                        book: new Book(),
                        mode: "add"
                    }
                },
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
        bookCtrl.showProgress();
        Book.query(function(entries) {
            bookCtrl.books = entries;
            bookCtrl.hideProgress();
        });
    });
});
