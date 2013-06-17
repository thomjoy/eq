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

            console.log(new XDate(+value).toString('h:mm:ss, (MMM d, yyyy)'));
        },

        addExtremes: function() {
            var min = this.collection.start,
                max = this.collection.end;

            this.$('#filter-range')
                .attr('value', min)
                .attr('min', min)
                .attr('max', max);
        }
    });
});