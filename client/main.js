
// Google Maps
define(
    'gmaps',
    ['async!http://maps.google.com/maps/api/js?v=3&sensor=false'],
    function(){
        return window.google.maps;
    });

// app.js
define([
    'gmaps',
    'backbone',
    'jquery'
], function(
    gmaps,
    Backbone,
    $
){
    console.log(gmaps);
    console.log(Backbone);
    console.log($);

    
});