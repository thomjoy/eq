define([
    'backbone',
    'templates'
], function(
    Backbone,
    t
){
    return Backbone.View.extend({
        id: 'interact-form',

        className: 'form',

        initialize: function() {
            _.extend(this, this.options);
            this.render();
        },

        render: function() {
            this.$el
                .html(_.template(t.form))
                .appendTo('body');
        }
    });
});