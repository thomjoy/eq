define(['backbone'], function(Backbone) {
    return Backbone.Collection.extend({
        model: Backbone.Model,

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