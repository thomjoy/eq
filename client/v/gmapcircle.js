define(['gmaps', 'backbone'], function(gmaps, Backbone) {
    return Backbone.View.extend({

        initialize: function() {
            _.extend(this, this.options);
            this.render();
            this.map = this.viewOptions.map;
        },

        render: function() {
            this.mapCircle = new gmaps.Circle(this.viewOptions);

            var _this = this;
            gmaps.event.addListener(this.mapCircle, 'click', function(evt){

                var infoWindow = new gmaps.InfoWindow({
                    content: _this.model.get('id') + ' ' + _this.model.get('properties').mag + ' at ' + _this.model.get('properties').place 
                });

                infoWindow.setPosition(evt.latLng);
                infoWindow.open(_this.map);
            });
        }
    });
});