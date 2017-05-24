function BookMock() {
    var BookService = jasmine.createSpyObj('BookSpy', ['$get', '$update_book', '$save', '$delete', '$delete_all']);
    return BookService;
}

function MdDialogMock() {
    var MdDialogService = jasmine.createSpyObj('MdDialogSpy', ['show','hide']);
    return MdDialogService;
}
