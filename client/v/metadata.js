define(['backbone', 'templates'], function(Backbone, templates) {
    return Backbone.View.extend({
        id: 'metadata',

        initialize: function() {
            _.extend(this, this.options);
            this.render();

            this.listenTo(this.collection, 'reset', this.update);
        },

        render: function() {
            this.$el.prependTo('body');
        },

        update: function() {
            this.$el.html(_.template(templates.metaData, this.collection.metadata));
        }
    });
});