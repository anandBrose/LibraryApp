describe('Testing BookAddController', function() {
    var scope, mdDialog, dialogData, route;
    beforeEach(module('book'))
    beforeEach(module('libraryApp'))

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        mdDialog = MdDialogMock();
        route = { current: { params: {} } };
        dialogData = {
            book: BookMock(),
            globals: {
                showProgressLoader: angular.noop,
                hideProgressLoader: angular.noop
            }
        };
        controller = $controller('bookAddController', {
            $scope: scope,
            Book: BookMock(),
            dialogData: dialogData,
            $route: route,
            $mdDialog: mdDialog
        })
    }))

    it('init categories on open', function() {
        expect(scope.categories.length).toBe(3);
    })
    it('should hide dialog on cancel', function() {
        scope.hide();
        expect(mdDialog.hide).toHaveBeenCalled();
    })
    it('should update book data on submit in update mode', function() {
        dialogData.mode = "update";
        route.current.params.id = 1;
        scope.submitBook({
            $valid: true
        });
        expect(dialogData.book.$update_book).toHaveBeenCalled();
    })
    it('should add book data on submit in add mode', function() {
        dialogData.mode = "add";
        scope.submitBook({
            $valid: true
        });
        expect(dialogData.book.$save).toHaveBeenCalled();
    })
})
