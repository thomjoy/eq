define(['gmaps', 'backbone'], function(gmaps, Backbone) {
    return Backbone.View.extend({

        initialize: function() {
            _.extend(this, this.options);
            this.render();
        },

        render: function() {
            new gmaps.Circle(this.viewOptions);
        }

    });
});