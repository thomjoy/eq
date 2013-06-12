var http = require('http');

var requestListener = function( req, res ) {
    var options = {
        host: 'earthquake.usgs.gov',
        path: '/earthquakes/feed/v1.0/summary/all_hour.geojson'
    };

    var headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET',
        'Access-Control-Allow-Headers': '*'
    };

    if( req.method === 'OPTIONS' ) {
        res.writeHead(200, headers);
        res.end();
        return;
    }
    else {
        console.log("Request from: " + req.headers.referer);
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

        http.request(options, allHourReq).end();
    }
};

var server = http.createServer(requestListener);
server.listen(8080);

console.log('Server running on 8080');