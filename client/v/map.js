// map.js
define(['gmaps', 'backbone'], function(gmaps, Backbone) {
    return Backbone.View.extend({
        id: 'map',

        className: 'blur',

        initialize: function() {
            _.extend(this, this.options);

            if( this.ready === false ) {
                console.log('Adding blur');
                this.className = 'blur';
            }

            this.render();
        },

        getMap: function() {
            return this.map;
        },

        removeBlur: function() {
            this.$el.removeClass('blur');
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