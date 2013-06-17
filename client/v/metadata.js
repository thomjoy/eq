define(['backbone', 'templates'], function(Backbone, templates) {
    return Backbone.View.extend({
        id: 'metadata',

        className: 'navbar navbar-fixed-top',

        initialize: function() {
            _.extend(this, this.options);
            this.render();

            this.listenTo(this.collection, 'reset', this.update);
        },

        render: function() {
            this.$el.prependTo('#header');
        },

        update: function() {
            var data = {
                generated: new XDate(this.collection.metadata.generated).toString('h:mm:ss, (MMM d, yyyy)')
            };
            this.$el.html(_.template(templates.metaData, _.extend(this.collection.metadata, data)));
        }
    });
});