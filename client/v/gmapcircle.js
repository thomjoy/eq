define(['gmaps', 'backbone', 'templates'], function(gmaps, Backbone, templates) {
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

                var infoWindowContent = {
                    id: _this.model.get('id'),
                    mag: _this.model.get('properties').mag,
                    place: _this.model.get('properties').place
                };

                var infoWindow = new gmaps.InfoWindow({
                    content: _.template(templates.infoWindow, infoWindowContent)
                });

                infoWindow.setPosition(evt.latLng);
                infoWindow.open(_this.map);
            });
        },

        // remove the circle from the actual gmap
        kill: function() {
            this.mapCircle.setMap(null);
            this.remove();
        }
    });
});