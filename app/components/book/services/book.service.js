angular.module('book').factory('Book', function($resource, $mdToast) {
    function resourceErrorHandler() {
        $mdToast.show(
            $mdToast.simple()
            .position('top left')
            .textContent('Ooops! Remote server failed to serve your request')
            .hideDelay(3000)
        );
    }
    return $resource('https://interview-api-staging.bytemark.co/:action/:id', { action: 'books', id: '@_id' }, {
        update_book: {
            method: 'PUT',
            interceptor: { responseError: resourceErrorHandler }
        },
        get: {
        	method: 'GET',
            interceptor: { responseError: resourceErrorHandler }
        },
        query: {
            method: 'GET',
            isArray: true,
            interceptor: { responseError: resourceErrorHandler }
        },
        save: {
        	method: 'POST',
            interceptor: { responseError: resourceErrorHandler }
        },
        delete: {
        	method: 'DELETE',
            interceptor: { responseError: resourceErrorHandler }
        },
        delete_all: {
            method: 'DELETE',
            action: 'clean',
            interceptor: { responseError: resourceErrorHandler }
        }
    });

});
