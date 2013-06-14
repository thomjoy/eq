define([
    'backbone',
    'm/quake'
], function(
    Backbone,
    Quake
){
    return Backbone.Collection.extend({
        model: Quake,

        url: 'http://localhost:8080/all/day',

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
        },

        getPeriod: function(params) {
            var newUrl = 'http://localhost:8080/all/' + params.period;
            this.url = newUrl;
            console.log(params.period + ': ' + this.url);
                    
            // weird
            this.reset();
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
        }

        //localStorage: new Backbone.LocalStorage("Points")
    });
});