angular.module('book').controller('bookAddController', function($scope, Book, dialogData, $route, $mdDialog) {
    $scope.book = dialogData.book;
    $scope.categories = ["Programming", "Novel", "Kids"]
    if ($scope.categories.indexOf($scope.book.categories) < 0) {
        $scope.categories.push($scope.book.categories);
    }
    $scope.hide = function() {
        $mdDialog.hide();
    }
    $scope.submitBook = function(form) {
        if (form.$valid) {
            if (dialogData.mode === "update") {
                $scope.book.$update_book({ id: $route.current.params.id });
            } else {
                $scope.book.$save();
            }
        }
    }
});
