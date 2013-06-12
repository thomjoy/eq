// map.js
define(['gmaps', 'backbone'], function(gmaps, Backbone) {
    return Backbone.View.extend({
        id: 'map',

        initialize: function() {
            _.extend(this, this.options);
            this.render();
        },

        getMap: function() {
            return this.map;
        },

        render: function() {
            var mapOptions = {
                zoom: 5,
                center: new gmaps.LatLng(38.8442, -122.7555),
                disableDefaultUI: false,
                mapTypeIds: gmaps.MapTypeId.ROADMAP
            };

            this.map = new gmaps.Map(this.el, mapOptions);
            this.$el.appendTo('body');
        }
    });
});