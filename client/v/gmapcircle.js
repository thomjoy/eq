define(['gmaps', 'backbone'], function(gmaps, Backbone) {
    return Backbone.View.extend({

        initialize: function() {
            _.extend(this, this.options);
            this.render();
        },

        render: function() {
            this.mapCircle = new gmaps.Circle(this.viewOptions);

            var _this = this;
            gmaps.event.addListener(this.mapCircle, 'click', function(ev){
                //infoWindow.setPosition(ev.latLng);
                //infoWindow.open(map);
                console.log(_this.model.get('id') + _this.model.get('properties').mag + ' at ' + _this.model.get('properties').place );
            });
        }
    });
});