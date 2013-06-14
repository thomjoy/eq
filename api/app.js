var express = require('express'),
    http = require('http');

var api = express();
var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Request-Method': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET',
    'Access-Control-Allow-Headers': '*'
};

api.get('/all/now', function(req, res){
    console.log('/all/now' + ' ' + req.headers.referer);
    allHourReq = function( response ) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function( chunk ) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function() {
            res.writeHead(200, headers);
            res.end(str);
        });
    };

    var options = {
        host: 'earthquake.usgs.gov',
        path: '/earthquakes/feed/v1.0/summary/all_hour.geojson'
    };

    http.request(options, allHourReq).end();
});

api.get('/all/day', function(req, res) {
    console.log('/all/day' + ' ' + req.headers.referer);
    allDayReq = function( response ) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function( chunk ) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function() {
            res.writeHead(200, headers);
            res.end(str);
        });
    };

    var options = {
        host: 'earthquake.usgs.gov',
        path: '/earthquakes/feed/v1.0/summary/all_day.geojson'
    };

    http.request(options, allDayReq).end();
});

api.get('/all/week', function(req, res) {
    console.log('/all/week' + ' ' + req.headers.referer);
    allWeekReq = function( response ) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function( chunk ) {
            str += chunk;
        });

        //the whole response has been recieved, so we jsust print it out here
        response.on('end', function() {
            res.writeHead(200, headers);
            res.end(str);
        });
    };

    var options = {
        host: 'earthquake.usgs.gov',
        path: '/earthquakes/feed/v1.0/summary/all_week.geojson'
    };

    http.request(options, allWeekReq).end();
});

api.get('all/month', function(req, res) {
    console.log('/all/month' + ' ' + req.headers.referer);
    allMonthReq = function( response ) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function( chunk ) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function() {
            res.writeHead(200, headers);
            res.end(str);
        });
    };

    var options = {
        host: 'earthquake.usgs.gov',
        path: '/earthquakes/feed/v1.0/summary/all_month.geojson'
    };

    http.request(options, allMonthReq).end();
});

api.listen(8080);
console.log('API up on 8080, Listening...');