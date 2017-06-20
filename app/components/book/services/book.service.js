angular.module('book').factory('Book', function($resource, $mdToast) {
    function resourceErrorHandler() {
        $mdToast.show(
            $mdToast.simple()
            .position('top left')
            .textContent('Ooops! Remote server failed to serve your request')
            .hideDelay(3000)
        );
    }
    return $resource('https://library-app-cad44.firebaseio.com/book/:id.json', { id: '@_id' }, {
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
