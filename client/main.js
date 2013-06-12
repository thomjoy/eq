
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
    'jquery',
    'v/map'
], function(
    gmaps,
    Backbone,
    $,
    GoogleMapView
){
    'use strict';

    console.log(gmaps);
    console.log(Backbone);
    console.log($);

    var map = new GoogleMapView();
});