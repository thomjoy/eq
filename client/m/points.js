define([
    'backbone',
    'm/quake'
], function(
    Backbone,
    Quake
){
    return Backbone.Collection.extend({
        model: Quake,

        url: 'http://localhost:8080/all/week',

        initialize: function() {
            //this.fetch();
        },

        parse: function(data) {
            this.metadata = data.metadata;
            return data.features;
        },

        comparator: function(m) {
            return -m.get('properties')['mag'];
        }

        //localStorage: new Backbone.LocalStorage("Points")
    });
});