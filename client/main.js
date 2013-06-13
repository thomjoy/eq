
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

    // group by mag
    // group by region

    var mapView = new GoogleMapView({
        ready: false
    });
    var formView = new FormView();

    var points = new PointsCollection();
    var circleCollection = new Backbone.Collection;
    
    // list
    var listView = new ListView({
        id: 'quakes',
        collection: points
    });

    // fetch all the models
    $.when( points.fetch({reset: true}) ).done(function() {
        console.log(points.length + ' points found');
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

            p.set('range', Math.ceil(properties.mag));

            var c = new GoogleMapsCircleView({
                id: 'circle-' + p.id,
                model: p,
                viewOptions: {
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