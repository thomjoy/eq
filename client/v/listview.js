define(['backbone'], function() {
    return Backbone.View.extend({
        tagName: 'ul',

        initialize: function() {
            _.extend(this, this.options);
            this.render();
            this.listItemsAsString = '';
            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function() {
            console.log('Collection Changed');
            this.$el.detach();
            this.$el.empty();
            this.$el
                .html(this.renderListString(this.collection.models))
                .appendTo('body');
        },


        renderListString: function(list) {
            var tmp = '';
            _.each(list, function(p) {
                tmp += '<li id="list-item-' + p.attributes.properties.id + '"><strong class="mag ' + p.get('magRating') + '">' + p.attributes.properties.mag + '</span> ' + p.attributes.properties.place  + '</li>';
            });
            return tmp;
        }
    });
});