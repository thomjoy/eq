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

            this.start = 0;
            this.end = 0;
        },

        parse: function(data) {
            this.metadata = data.metadata;
            return data.features;
        },

        comparator: function(m) {
            return -m.get('properties').time;
        },

        // this should be moved out into a 'collection of collections'
        // dynamically changing the url isn't great.
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
                f = _.filter(this.models, function(quake) {
                    return quake.attributes.properties.mag >= minimum;
                });
            console.log(this.filtered.length + ' models with mag >= ' + minimum);
            return f;
        },

        filterByTime: function(params) {
            var maxTime = params.upTo;

            var f = _.filter(this.models, function(quake) {
                return quake.attributes.properties.time <= maxTime;
            });
            return f;
        },

        groupByMag: function() {
            return _.groupBy(this.models, function(m){ return Math.floor(m.attributes.properties.mag); });
        }

        //localStorage: (new Backbone.LocalStorage("Points"))
    });
});