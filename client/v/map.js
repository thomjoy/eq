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

        // put this a web worker thread
        removeBlur: function() {
            var interval;

            interval = setInterval(function step() {
                var blurString = this.$el.css('-webkit-filter'),
                    blurVal = blurString.match(/\d+/g)[0];
                console.log(blurVal);
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

            var styles = [
                {
                  stylers: [
                    { hue: "#06202f" },
                    { saturation: -10 },
                    { lightness: 0 }
                  ]
                },{
                    featureType: "landscape.natural.terrain",
                    stylers: [
                        { hue: "0c4b70" },
                        { saturation: -10 }
                    ]
                },{
                  featureType: "road",
                  elementType: "geometry",
                  stylers: [
                    { hue: "0c4b70" },
                    { lightness: 100 },
                    { visibility: "simplified" }
                  ]
                },{
                  featureType: "road",
                  elementType: "labels",
                  stylers: [
                        { visibility: "off" }
                  ]
                }, {
                    featureType: "water",
                    stylers: [
                        { hue: "0c4b70" },
                        { lightness: -30 }
                    ]
                }
            ];

            this.styledMap = new gmaps.StyledMapType(styleMapOptions, { name: "Grayscale" });    

            var mapOptions = {
                zoom: 5,
                center: new gmaps.LatLng(38.8442, -122.7555),
                disableDefaultUI: false,
                mapTypeControlOptions: {
                    mapTypeIds: [gmaps.MapTypeId.ROADMAP, 'mapStyle']
                }
            };

            this.map = new gmaps.Map(this.el, mapOptions);
            this.map.mapTypes.set('mapStyle', this.styledMap);
            this.map.setMapTypeId('mapStyle');

            this.$el.appendTo('body');
        }
    });
});