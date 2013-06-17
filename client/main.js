// app.js
define([
    'r/router',

    'v/formview',
    'v/map',
    'v/listview',
    'v/metadata',

    'm/points' // collection
], function(
    Router,

    FormView,
    GoogleMapView,
    ListView,
    MetaDataView,

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

        points = new PointsCollection(),

        // holds all the co-ordinates etc..
        dataSets = new Backbone.Collection({
            Model: points
        }),

        // header, with titles etc...
        metaDataView = new MetaDataView({
            collection: points
        }),

        // holds the reference to the google maps
        // div 'map canvas'
        mapView = new GoogleMapView({
            vent: vent,
            collection: points
        }),

        // form with stuff in
        formView = new FormView({
            collection: points,
            vent: vent
        }),

        // simple list view of the geocode data
        listView = new ListView({
            collection: points,
            vent: vent
        });

    // {root: "/client/"}
    Backbone.history.start({ pushState: true });

    // via: https://github.com/backbone-boilerplate/backbone-boilerplate
    $(document).on("click", "a[href]:not([data-bypass])", function(evt) {
        // Get the absolute anchor href.
        var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
        // Get the absolute root.
        var root = location.protocol + "//" + location.host + app.root;

        // Ensure the root is part of the anchor href, meaning it's relative.
        if (href.prop.slice(0, root.length) === root) {
            // Stop the default event to ensure the link will not cause a page
            // refresh.
            evt.preventDefault();

            // `Backbone.history.navigate` is sufficient for all Routers and will
            // trigger the correct events. The Router's internal `navigate` method
            // calls this anyways.  The fragment is sliced from the root.
            Backbone.history.navigate(href.attr, true);
        }
    });
});