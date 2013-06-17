define([
    'm/quake',
    'xdate',
    'backbone',
    'backbone.localstorage'
], function(
    Quake,
    XDate,
    Backbone
){
    return Backbone.Collection.extend({
        model: Quake,

        url: 'http://localhost:8080/all/day',

        initialize: function() {
            _.extend(this, this.options);
        },

        parse: function(data) {
            this.metadata = data.metadata;
            return data.features;
        },

        comparator: function(m) {
            return -m.get('properties').time;
        },

        getPeriod: function(params) {
            this.url = 'http://localhost:8080/all/' + params.period;

            // reset everything
            this.models.length = 0;

            // re-fetch the collection
            this.fetch({reset: true});
        },

        // get timevalue extremes
        getStartEnd: function() {
            if( !this.models[0] ) return {};

            this.start = this.models[this.models.length-1].attributes.properties.time;
            this.end = this.models[0].attributes.properties.time;
            return { start: this.start, end: this.end };
        },

        filterByMag: function(params) {
            var minimum = params.mag;

            // lame, we shouldn't have to reset the collection here...
            // or re-fetch this data
            //$.when( this.fetch({reset: false}) ).done(function() {
            this.filtered.reset(_.filter(this.models, function(quake) {
                return quake.attributes.properties.mag >= minimum;
            }));
            console.log(this.filtered.length + ' models with mag >= ' + minimum);
        },

        filterByTime: function(params) {
            var maxTime = params.upTo;
            var c = _.filter(this.models, function(quake) {
                return quake.attributes.properties.time <= maxTime;
            });

            console.log(c.length);
        },

        groupByMag: function() {
            return _.groupBy(this.models, function(m){ return Math.floor(m.attributes.properties.mag); });
        }

        //localStorage: (new Backbone.LocalStorage("Points"))
    });
});