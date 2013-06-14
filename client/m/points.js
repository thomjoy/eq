define([
    'm/quake',
    'xdate'
], function(
    Quake,
    XDate
){
    return Backbone.Collection.extend({
        model: Quake,

        url: 'http://localhost:8080/all/day',

        initialize: function() {
            _.extend(this, this.options);
            //this.listenTo(this.vent, 'period:change', this.getPeriod);

            this.start = new Date();
            this.end = new Date();
        },

        parse: function(data) {
            this.metadata = data.metadata;
            return data.features;
        },

        comparator: function(m) {
            return m.get('properties').time;
        },

        getPeriod: function(params) {
            this.url = 'http://localhost:8080/all/' + params.period;
            console.log(params.period + ': ' + this.url);

            // weird
            //this.models.length = null;
            //console.log('length is: ' + this.models.length);
            this.models.length = 0;
            //console.log('after destroy, length is: ' + this.models.length);
            this.fetch({reset: true});
        },

        // temp
        parseFeedMetaData: function() {
            var outStr = '';
            _.each(_.pairs(this.metadata), function(tuple) {
                var key = tuple[0],
                    val = tuple[1];

                if( _.contains(['status', 'url'], key) ) return;
                if( key === 'generated' ) {
                    val = new Date(val).toString();
                }

                outStr += '<span class="meta-title">' + key + ':</span>' +
                '<span class="meta-value">' + val + '</span> ';
            });
            return outStr;
        },

        // get timevalue extremes
        getStartEnd: function() {
            this.start = this.models[0].attributes.properties.time;
            this.end = this.models[this.models.length-1].attributes.properties.time;
            return { start: this.start, end: this.end };
        }

        //localStorage: new Backbone.LocalStorage("Points")
    });
});