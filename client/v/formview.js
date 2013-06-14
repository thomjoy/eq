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

        events: {
            'change #time-period-select': 'changeTest'
        },

        initialize: function() {
            _.extend(this, this.options);
            this.render();
        },

        render: function() {
            this.$el
                .html(_.template(t.form))
                .appendTo('body');
        },

        changeTest: function(evt) {
            var selectId = $(evt.currentTarget).attr('id'),
                period = $('#' + selectId + ' option:selected').data('period');
            console.log(period);
            this.vent.trigger('period:change', {period: period});
        }
    });
});