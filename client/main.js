
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
    'r/router',

    'v/formview',
    'v/map',
    'v/listview',
    'm/points' // collection
], function(
    gmaps,
    Backbone,
    Router,

    FormView,
    GoogleMapView,
    ListView,
    PointsCollection
){
    'use strict';

    var appRouter = new Router();

    // {root: "/client/"}
    Backbone.history.start({ pushState: true });

    var EA = {};
        EA.all = _.clone(Backbone.Events);

    var vent = _.clone(Backbone.Events);
    var points = new PointsCollection();
    var mapView = new GoogleMapView({
        vent: vent,
        collection: points
    });
    var formView = new FormView({
        collection: points
    });
    var listView = new ListView({
        id: 'quakes',
        collection: points,
        vent: vent
    });


    // fetch all the models
    $.when( points.fetch({reset: true}) ).done(function() {
        console.log(points.length + ' points found');
        $('#metadata')
            .html(points.parseFeedMetaData())
            .slideDown();
    });
});