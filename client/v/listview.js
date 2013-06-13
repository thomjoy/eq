define(['backbone'], function() {
    return Backbone.View.extend({
        tagName: 'ul',

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
                .appendTo('body');
        },

        renderListAsString: function(list) {
            var tmp = '';

            _.each(list, function(p, index) {
                if(index === 0) console.log(p.magRating());
                tmp += '<li id="list-item-' + p.get('id') + '"><strong class="mag ' + p.magRating() + '">' + p.get('properties').mag + '</strong> ' + p.get('properties').place  + '</li>';
            });

            return tmp;
        }
    });
});