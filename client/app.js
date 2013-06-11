// config.js
requirejs.config({
    'baseUrl': 'client/',
    'paths': {},
    'shim': {
        'underscore': {
            'exports': '_'
        },
        'jquery': {
            'exports': '$'
        },
        'backbone': {
            'deps': ['underscore', 'jquery'],
            'exports': 'Backbone'
        },
        'backbone.localstorage': {
            'deps': ['backbone'],
            'exports': 'Backbone'
        }
    }
});

// load the app.
requirejs(["client/main"]);