angular.module('book').controller('bookViewController', function($scope, Book, $timeout, $route, $mdDialog, $location, $mdToast) {
    var bookViewCtrl = this;
    bookViewCtrl.showConfirm = function(ev, book) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete this product?')
            .textContent('This cannot be undone!')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('no');

        $mdDialog.show(confirm).then(function() {
            $scope.globals.showProgressLoader();
            book.$delete({ id: $route.current.params.id }, function() {
                $scope.globals.hideProgressLoader();
                $location.path("/");
            }, $scope.globals.hideProgressLoader);
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
                        mode: "update",
                        globals: $scope.globals,
                        callback: function() {
                            bookViewCtrl.loadContent();
                        }
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
    bookViewCtrl.loadContent = function() {
        $scope.globals.showProgressLoader();
        Book.get({ id: $route.current.params.id }, function(resp) {
            $scope.globals.hideProgressLoader();
            if (resp.error) {
                $mdToast.show(
                    $mdToast.simple()
                    .position('top left')
                    .textContent('Ooops! Book not found')
                    .hideDelay(3000)
                );
                return;
            }
            bookViewCtrl.book = resp;
        }, $scope.globals.hideProgressLoader);
    }
    $scope.$on('$viewContentLoaded', function readyToTrick() {
        bookViewCtrl.loadContent();
    });
});
