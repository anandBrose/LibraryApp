angular.module('book').factory('Book', function($resource) {
    return $resource('https://interview-api-staging.bytemark.co/books/:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    });

});
