define(['backbone'],function(Backbone) {
   return Backbone.Router.extend({

        routes: {
            '': 'root'
        },

        initialize: function() {
            console.log('Router is Ready');
        },

        root: function() {
            console.log('/');
        }
   });
});