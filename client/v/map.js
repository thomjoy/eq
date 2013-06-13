// map.js
define(['gmaps', 'backbone'], function(gmaps, Backbone) {
    return Backbone.View.extend({
        id: 'map',

        className: 'blur',

        initialize: function() {
            _.extend(this, this.options);
            this.render();
        },

        getMap: function() {
            return this.map;
        },

        // put this a web worker thread?
        removeBlur: function() {
            var interval;

            interval = setInterval(function step() {
                var blurString = this.$el.css('-webkit-filter'),
                    blurVal = blurString.match(/\d+/g)[0];
                if( blurVal && blurVal > 0 ) {
                    blurVal--;
                    this.$el.css('-webkit-filter', 'blur(' + blurVal + 'px)');
                }
                else {
                    this.$el.removeClass('blur');
                    clearInterval(interval);
                    return;
                }
            }.bind(this), 75);
        },

        render: function() {
            var styleMapOptions = [
            {
                featureType: "all",
                elementType: "all",
                stylers: [
                    { saturation: -100 }
                ]
            }];

            var mapOptions = {
                zoom: 5,
                center: new gmaps.LatLng(38.8442, -122.7555),
                disableDefaultUI: false,
                mapTypeControlOptions: {
                    mapTypeIds: [gmaps.MapTypeId.ROADMAP, 'mapStyle']
                }
            };

            this.styledMap = new gmaps.StyledMapType(styleMapOptions, { name: "Grayscale" });   
            this.map = new gmaps.Map(this.el, mapOptions);
            this.map.mapTypes.set('mapStyle', this.styledMap);
            this.map.setMapTypeId('mapStyle');

            this.$el.appendTo('body');
        }
    });
});