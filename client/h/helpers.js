define(['underscore'], function(_) {
    return {
        magToColour: function(mag) {
            var m = parseFloat(mag, 10);

            if( m >= 0.0 && m < 0.99 ) {
                return "#3914AF";
            }
            if( m >= 1.0 && m < 1.99 ) {
                return "#FFE773";
            }  
            if( m >= 2.0 && m <  2.99 ) {
                return "#FFDE40";
            }
            if( m >= 3.0 && m < 3.99 ) {
                return "#BFA730";
            }      
            if( m >= 4.0 && m < 4.99 ) {
                return "#FFD300";
            }      
            if( m >= 5.0 && m < 5.99 ) {
                return "#A60000";
            }
            if( m >= 6.0 && m < 6.99 ) {
                return "#BF3030";
            }      
            if( m >= 7.0 && m < 7.99 ) {
                return "#FF0000";
            }
        },

        // this should probably be on the collection
        parseFeedMetaData: function(metadata) {
            console.log(metadata);
            var outStr = '';

            _.each(_.pairs(metadata), function(tuple) {
                var key = tuple[0],
                    val = tuple[1];

                if( _.contains(['status', 'url'], key) ) return;

                if( key === 'generated' ) {
                    val = new Date(val).toString();
                }

                outStr += '<span class="meta-title">' + key + ':</span>' +
                '<span class="meta-value">' + val + '</span> ';
            });
            return outStr;
        }
    };
});