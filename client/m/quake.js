define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        getLatLong: function() {
            return this.get('geometry');
        }
    });
});