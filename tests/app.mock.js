function BookMock() {
    var BookService = jasmine.createSpyObj('BookSpy', ['$get', '$update_book', '$save', '$delete', '$delete_all', 'query']);
    BookService.query.and.callFake(function(success) {
        success([{
            "title": "Title 1"
        }]);
    })
    return BookService;
}

function MdDialogMock() {
    var MdDialogService = jasmine.createSpyObj('MdDialogSpy', ['show', 'hide', 'confirm', 'title', 'textContent', 'targetEvent', 'ok', 'cancel']);
    MdDialogService.confirm.and.returnValue(MdDialogService);
    MdDialogService.title.and.returnValue(MdDialogService);
    MdDialogService.textContent.and.returnValue(MdDialogService);
    MdDialogService.targetEvent.and.returnValue(MdDialogService);
    MdDialogService.ok.and.returnValue(MdDialogService);
    MdDialogService.cancel.and.returnValue(MdDialogService);
    MdDialogService.show.and.returnValue({ then: angular.noop });
return MdDialogService;
}
