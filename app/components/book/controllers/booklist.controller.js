angular.module('book').controller('bookListController', function($scope, Book, $timeout, $mdDialog) {
    var bookCtrl = this;
    bookCtrl.deleteAll = function(ev) {
        $scope.globals.showProgressLoader();
        Book.delete_all({ action: 'clean' }, function(entries) {
            $scope.globals.hideProgressLoader();
        }, $scope.globals.hideProgressLoader);
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
                        mode: "add",
                        globals: $scope.globals,
                        callback: function() {
                            bookViewCtrl.loadContent();
                        }
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
    bookCtrl.loadContent = function() {
        $scope.globals.showProgressLoader();
        Book.query(function(entries) {
            bookCtrl.books = entries;
            $scope.globals.hideProgressLoader();
        }, function(error){
            $scope.globals.hideProgressLoader();
        });
    }
    $scope.$on('$viewContentLoaded', function readyToTrick() {
        bookCtrl.loadContent();
    });
});
