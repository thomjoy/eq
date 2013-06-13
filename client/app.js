requirejs.config({

    waitSeconds: 30,
    paths: {
        // plugins
        //create alias to plugins (not needed if plugins are on the baseUrl)
        async: 'lib/requirejs-plugins/src/async',
        font: '/client/lib/requirejs-plugins/src/font',
        goog: '/client/lib/requirejs-plugins/src/goog',
        image: '/client/lib/requirejs-plugins/src/image',
        json: '/client/lib/requirejs-plugins/src/json',
        noext: '/client/lib/requirejs-plugins/src/noext',
        mdown: '/client/lib/requirejs-plugins/src/mdown',
        propertyParser : '/client/lib/requirejs-plugins/src/propertyParser',
        markdownConverter : '/client/lib/requirejs-plugins/src/Markdown.Converter',
        text: 'lib/requirejs-plugins/src/text',
        domReady: 'lib/requirejs-plugins/src/domReady(callback)',

        underscore:                 'lib/underscore',
        backbone:                   'lib/backbone',
        'backbone.localstorage':    'lib/backbone.localstorage',
        jquery:                     'lib/jquery-2.0.2.min'
    },
    shim: {
        underscore: {
            exports: '_'
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