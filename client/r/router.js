define(['backbone'],function(Backbone) {
   return Backbone.Router.extend({

        routes: {
            '': 'root',
            'test': 'test',
            'month': 'month',
            'week': 'week',
            'day': 'day',
            'hour': 'hour'
        },

        root: function() {
            console.log('/');
        },

        test: function() {
            //console.log('/test?');
        },

        week: function(params) {
            console.log('/week');
        }
   });
});