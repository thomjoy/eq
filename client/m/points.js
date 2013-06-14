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
            _.extend(this, this.options);
            //this.listenTo(this.vent, 'period:change', this.getPeriod);
        },

        getPeriod: function(params) {
            var period = params.period;
            console.log('getPeriod got: ' + period);
        },

        parse: function(data) {
            this.metadata = data.metadata;
            return data.features;s
        },

        comparator: function(m) {
            return -m.get('properties').mag;
        }

        //localStorage: new Backbone.LocalStorage("Points")
    });
});