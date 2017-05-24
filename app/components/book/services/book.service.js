angular.module('book').factory('Book', function($resource) {
    return $resource('https://interview-api-staging.bytemark.co/books/:id', { id: '@_id' }, {
        update_book: {
            method: 'PUT'
        },
        delete_book: {
            method: 'DELETE',
            headers: {
                'Content-Type': 'text/plain'
            }
        }
    });

});
