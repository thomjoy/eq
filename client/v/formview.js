define(['backbone', 'templates', 'xdate'], function(Backbone, templates, XDate){
    return Backbone.View.extend({
        id: 'interact-form',

        events: {
            'change #time-period-select': 'changePeriod',
            'change #filter-mag': 'filterMag',
            'change #filter-range': 'filterRange'
        },

        initialize: function() {
            _.extend(this, this.options);
            this.render();

            this.listenTo(this.collection, 'reset', this.addExtremes);
        },

        render: function() {
            this.$el
                .hide()
                .html(_.template(templates.form))
                .appendTo('#header');
        },

        changePeriod: function(evt) {
            var selectId = $(evt.currentTarget).attr('id'),
                period = $('#' + selectId + ' option:selected').data('period');

            this.collection.getPeriod({period: period});
        },

        filterMag: function(evt) {
            var selectId = $(evt.currentTarget).attr('id'),
                mag = $('#' + selectId + ' option:selected').data('mag');

            this.collection.filterByMag({mag: mag});
        },

        filterRange: function(evt) {
            var selectId = $(evt.currentTarget).attr('id'),
                value = $('#' + selectId).val();
            
            var c = this.collection.filterByTime({upTo: value});
            this.vent.trigger('vm:update', {date: value, models: c});
        },

        addExtremes: function() {
            var d = this.collection.getStartEnd();
            this.$('#filter-range')
                .attr('value', d.start)
                .attr('min', d.start)
                .attr('max', d.end);

            var start = this.$('#start-label').html(new XDate(d.start).toString('h:mm:ss, (MMM d, yyyy)'));
            var end = this.$('#end-label').html(new XDate(d.end).toString('h:mm:ss, (MMM d, yyyy)'));

            this.$el.slideDown();
        }
    });
});