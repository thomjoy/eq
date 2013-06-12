define(['backbone'], function() {
    return Backbone.View.extend({
        tagName: 'ul',

        initialize: function() {
            _.extend(this, this.options);
            this.render();
        },

        render: function() {
            this.$el.appendTo('body');
        },

        renderListString: function(listItemsAsString) {
            this.$el.html(listItemsAsString);
            console.log(listItemsAsString.length);
        }
    });
});