define('checkboxtree/CheckboxTreeWidget', [
    'backbone',
    'checkboxtree/ListView'
], function(
    Backbone,
    ListView
){
    return Backbone.View.extend({
        initialize: function(){
            var $list = this.$('> ul');

            if ($list.length) {
                this.rootList = new ListView({
                    el: $list
                });
                this.displayTotalCost();
                this.rootList.collection.on('change:cost', this.displayTotalCost, this);
            }
        },

        displayTotalCost: function(){
            var totalCost = this.rootList.collection.getCost();

            this.$('.js-total').html(totalCost);
        }
    });
});
