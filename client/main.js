
// Google Maps
define(
    'gmaps',
    ['async!http://maps.googleapis.com/maps/api/js?key=AIzaSyDHkmCO0w9F0SR8BPsQ201QCfTCQATn1uU&sensor=false'],
    function(){
        return window.google.maps;
    });

// app.js
define([
    'gmaps',
    'backbone',

    'h/helpers',

    'v/formview',
    'v/map',
    'v/listview',
    'v/gmapcircle',
    'm/points' // collection
], function(
    gmaps,
    Backbone,

    h,

    FormView,
    GoogleMapView,
    ListView,
    GoogleMapsCircleView,
    PointsCollection
){
    'use strict';

    var vent = _.clone(Backbone.Events);

    var mapView = new GoogleMapView({
        vent: vent
    });

    var formView = new FormView();

    var points = new PointsCollection();
    var circleCollection = new Backbone.Collection();

    // list
    var listView = new ListView({
        id: 'quakes',
        collection: points,
        vent: vent
    });

    // fetch all the models
    $.when( points.fetch({reset: true}) ).done(function() {
        console.log(points.length + ' points found');
        $('#metadata')
            .html(h.parseFeedMetaData(points.metadata))
            .slideDown();

        plotCircles(points);
    });

    function plotCircles(points) {
        var listItems = "";
        points.forEach(function(p) {

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
                    map: mapView.getMap(),
                    center: pos,
                    radius: 10000 * properties.mag
                }
            });

            circleCollection.add(c);
        });

        mapView.removeBlur();
    }
});