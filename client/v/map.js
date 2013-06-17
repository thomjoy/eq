// map.js
define([
    'gmaps',
    'backbone',
    'xdate',
    'h/helpers',
    'v/gmapcircle'
],function(
    gmaps,
    Backbone,
    XDate,
    h,
    GoogleMapsCircleView
){
    return Backbone.View.extend({
        id: 'map',

        className: 'blur',

        initialize: function() {
            _.extend(this, this.options);
            this.render();

            this.listenTo(this.vent, 'map:navto', this.navToLatLng);
            this.listenTo(this.collection, 'reset', this.plotCircles);
            this.listenTo(this.collection, 'request', this.addLoadingBlur);
            
            // holds the Google Map Circle Views
            // actually its like Collection -> Model -> View
            // need to find a better way to do this.
            this.circleCollection = new Backbone.Collection();

            // fire off a request for some data...
            this.collection.fetch({reset: true});
        },

        navToLatLng: function(coords) {
            var pos = new gmaps.LatLng(coords.lat, coords.lng);
            this.map.setCenter(pos);
        },

        getMap: function() {
            return this.map;
        },

        // put this a web worker thread?
        removeLoadingBlur: function() {
            var interval = setInterval(function step() {
                var blurString = this.$el.css('-webkit-filter'),
                    blurVal = blurString.match(/\d+/g)[0];

                if( blurVal && blurVal > 0 ) {
                    blurVal--;
                    this.$el.css('-webkit-filter', 'blur(' + blurVal + 'px)');
                }
                else {
                    //this.$el.css('-webkit-filter', '');
                    this.$el.removeClass('blur');
                    clearInterval(interval);
                    return;
                }
            }.bind(this), 50);
        },

        addLoadingBlur: function() {
            var interval = setInterval(function step() {
                var blurString = this.$el.css('-webkit-filter'),
                    blurVal = blurString.match(/\d+/g)[0];

                if( blurVal && blurVal < 8 ) {
                    blurVal++;
                    this.$el.css('-webkit-filter', 'blur(' + blurVal + 'px)');
                }
                else {
                    //this.$el.css('-webkit-filter', '');
                    this.$el.addClass('blur');
                    clearInterval(interval);
                    return;
                }
            }.bind(this), 10);
        },

        plotCircles: function() {
            var _this = this,
                collection = this.collection,
                extremes = collection.getStartEnd();

            console.log('Map updating... ' + collection.length + ' points found');

            // remove all the previous references
            if( this.circleCollection.length > 0 ) {
                // weird, as each 'circle' is a model that references
                // a gmapcircle view...
                _.each(this.circleCollection.models, function(circle) {
                    circle.attributes.kill(); // remove from map and the collection
                });

                // i don't love this...
                this.circleCollection.reset();
            }

            // go through the new collection
            _.each(collection.models, function(p) {
                var point = p.attributes,
                    pos = new gmaps.LatLng(
                        +point.geometry.coordinates[1],
                        +point.geometry.coordinates[0]
                    ),
                    properties = point.properties,
                    title = properties.mag + " at " + properties.place;

                var c = new GoogleMapsCircleView({
                    id: 'circle-' + p.id,
                    model: p,
                    viewOptions: {
                        clickable: true,
                        strokeOpacity: 0,
                        strokeWeight: 0,
                        strokeColor: 'transparent',
                        fillColor: h.magToColour(properties.mag),
                        fillOpacity: 0.4,
                        map: this.map,
                        center: pos,
                        radius: 10000 * properties.mag
                    }
                });

                this.circleCollection.add(c);
            }.bind(this));

            this.removeLoadingBlur();
        },

        render: function() {
            var styleMapOptions = [{
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
                    mapTypeIds: [gmaps.MapTypeId.ROADMAP, gmaps.MapTypeId.TERRAIN, 'mapStyle']
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