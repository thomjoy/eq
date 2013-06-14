define(['backbone'],function(Backbone) {
   return Backbone.Router.extend({

        routes: {
            '': 'root',
            'test': 'test'
        },

        initialize: function() {
            console.log('Router is Ready');
        },

        root: function() {
            console.log('/');
        },

        test: function() {
            console.log('/test?');
        }
   });
});