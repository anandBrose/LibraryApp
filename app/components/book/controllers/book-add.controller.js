angular.module('book').controller('bookAddController', function($scope, Book, dialogData, $route, $mdDialog) {
    $scope.book = dialogData.book;
    $scope.categories = ["Programming", "Novel", "Kids"]
    $scope.hide = function() {
        $mdDialog.hide();
    }
    $scope.submitBook = function(form) {
        if (form.$valid) {
            dialogData.globals.showProgressLoader();
            if (dialogData.mode === "update") {
                $scope.book.$update_book({ id: $route.current.params.id }, function() {
                    dialogData.globals.hideProgressLoader()
                    if (dialogData.callback) {
                        dialogData.callback();
                    }
                }, dialogData.globals.hideProgressLoader);
            } else {
                $scope.book.$save(function() {
                    dialogData.globals.hideProgressLoader();
                    if (dialogData.callback) {
                        dialogData.callback();
                    }
                }, dialogData.globals.hideProgressLoader);
            }
            $scope.hide();
        }
    }
});
