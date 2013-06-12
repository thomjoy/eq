
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
    'v/map',
    'v/listview',
    'v/gmapcircle',
    'm/points' // collection
], function(
    gmaps,
    Backbone,
    GoogleMapView,
    ListView,
    GoogleMapsCircleView,
    PointsCollection
){
    'use strict';

    // yay!
    var mapView = new GoogleMapView();

    // list
    var listView = new ListView({
        id: 'quakes'
    });

    var points = new PointsCollection();
    var circleCollection = new Backbone.Collection;

    $.when( points.fetch() ).done(function() {
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

            function magToColour(m) {
                switch( parseFloat(m, 10) ) {
                    case ( m >= 0 && m < 0.99 ):
                        return "#eee";
                    
                    case ( m >= 1 && m < 1.99 ):
                        return "#ddd";
                    
                    case ( m >= 2 && m <  2.99 ):
                        return "#ccc";

                    case ( m >= 3 && m < 3.99 ):
                        return "#bbb";
                    
                    case ( m >= 4 && m < 4.99 ):
                        return "#aaa";
                    
                    case ( m >= 5 && m < 5.99 ):
                        return "#999";
                    
                    case ( m >= 6 && m < 6.99 ):
                        return "#999";

                    case ( m >= 6 && m < 6.99 ):
                        return "#888";
                }
            }

            // new QuakeRadiusView...
            /*
            var populationOptions = {
                strokeOpacity: 0,
                strokeWeight: 0,
                strokeColor: '#FF0000',
                fillColor: magToColour(properties.mag),
                fillOpacity: 0.1,
                map: mapView.getMap(),
                center: pos,
                radius: 10000 * properties.mag
            };
            new gmaps.Circle(populationOptions);
            */

            var c = new GoogleMapsCircleView({
                id: 'circle-' + p.id,
                model: p,
                viewOptions: {
                    strokeOpacity: 0,
                    strokeWeight: 0,
                    strokeColor: '#FF0000',
                    fillColor: magToColour(properties.mag),
                    fillOpacity: 0.1,
                    map: mapView.getMap(),
                    center: pos,
                    radius: 10000 * properties.mag
                }
            });

            circleCollection.add(c);
            
            // ul
            listItems += '<li id="list-item-' + point.id + '"><span class="mag">' + properties.mag + '</span> ' + properties.place  + '</li>';
        });

        listView.renderListString(listItems);
        console.log(circleCollection.models[5]);
    }
});