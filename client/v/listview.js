define(['templates', 'backbone'], function(templates, Backbone) {
    return Backbone.View.extend({
        id: 'quakes',

        tagName: 'ul',

        events: {
            'click li': 'highlightOnMap'
        },

        initialize: function() {
            _.extend(this, this.options);
            this.render();

            // re-render the list when the collection changes
            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function() {
            // detach from the DOM
            this.$el.detach();

            // remove old nodes
            this.$el.empty();

            // insert the new nodes
            this.$el
                .html(this.renderListAsString(this.collection.models))
                .prependTo('#main');
        },

        renderListAsString: function(list) {
            var tmp = '';
            _.each(list, function(p, index) {
                var templateData = {
                    id: p.get('id'),
                    mag: p.get('properties').mag,
                    magRating: p.magRating(),
                    place: p.get('properties').place,
                    detail: p.get('properties').detail,
                    time: p.getTime(),
                    sig: p.get('properties').sig,
                    status: p.get('properties').status,

                    lat: p.get('geometry').coordinates[1],
                    lng: p.get('geometry').coordinates[0],
                    depth: p.get('geometry').coordinates[2]
                };

                tmp += _.template(templates.listViewItem, templateData);
            });

            return tmp;
        },

        highlightOnMap: function(evt){
            var quakeId = this.$(evt.currentTarget).data('id'),
                model = this.collection.get(quakeId),
                position = model.attributes.geometry.coordinates;

            this.vent.trigger('map:navto', {lat: position[1], lng: position[0]});
        }
    });
});