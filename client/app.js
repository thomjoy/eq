requirejs.config({
    waitSeconds: 30,
    paths: {
        underscore: '/client/lib/underscore',
        backbone:   '/client/lib/backbone',
        'backbone.localstorage': '/client/lib/backbone.localstorage',
        jquery:     '/client/lib/jquery-2.0.2.min'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone.localstorage': {
            deps: ['backbone'],
            exports: 'Backbone'
        }
    }
});

// load the app.
require(['main']);