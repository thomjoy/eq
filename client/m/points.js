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
            //this.listenTo(this.vent, 'period:change', this.getPeriod);

            // stores the filtered models
            this.filtered = new Backbone.Collection();
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
            this.filtered.set(_.filter(this.models, function(quake) {
                return quake.attributes.properties.mag >= minimum;
            }));

            //this.collection.set(filteredList);
            //}.bind(this));
            console.log(this.filtered.length + ' models with mag >= ' + minimum);
        },

        //localStorage: (new Backbone.LocalStorage("Points"))
    });
});