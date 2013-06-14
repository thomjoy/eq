// app.js
define([
    'r/router',

    'v/formview',
    'v/map',
    'v/listview',
    'm/points' // collection
], function(
    Router,

    FormView,
    GoogleMapView,
    ListView,
    PointsCollection
){
    'use strict';

    // Legacy, to remove
    var vent = _.clone(Backbone.Events),

        // To be replaced by an application level
        // Event Aggregator
        EA = {
            all: _.clone(Backbone.Events)
        },

        // application router
        appRouter = new Router(),

        // holds all the co-ordinates etc..
        points = new PointsCollection(),

        // holds the reference to the google maps
        // div 'map canvas'
        mapView = new GoogleMapView({
            vent: vent,
            collection: points
        }),

        // form with stuff in
        formView = new FormView({
            collection: points
        }),

        // simple list view of the geocode data
        listView = new ListView({
            collection: points,
            vent: vent
        });

    // {root: "/client/"}
    Backbone.history.start({ pushState: true });
});