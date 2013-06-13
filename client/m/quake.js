define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({

        magRating: function() {
            var m = Math.ceil(this.get('properties').mag);
            if( m < 3 ) return 'light';
            if( m < 6 ) return 'medium';
            else return 'severe';
        },

        getTime: function() {
            return new Date(this.get('properties').time);
        }


    });
});