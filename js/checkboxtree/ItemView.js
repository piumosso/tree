define('checkboxtree/ItemView', [
    'jquery',
    'backbone',
    'checkboxtree/ItemModel'
], function(
    $,
    Backbone,
    ItemModel
){
    return Backbone.View.extend({
        events: {
            'change > label :checkbox': 'onCheckboxChanged'
        },

        initialize: function(){
            var $checkbox = this.$(':checkbox');

            this.model = new ItemModel({
                isChecked: $checkbox.prop('checked'),
                amount: $checkbox.data('amount') || 0
            });
            this.model.on('change:isChecked', this.onIsCheckedChanged, this);
            this.model.on('change:cost', this.onCostChanged, this);

            this.initializeNestedList();
        },

        initializeNestedList: function(){
            var $nestedList = this.$('> ul'),
                that = this;

            if ($nestedList.length) {
                require(['checkboxtree/ListView'], function(ListView){
                    var nestedListView = new ListView({
                        el: $nestedList
                    });
                    that.model.setNestedCollection(nestedListView.collection);
                });
            }
        },

        onCheckboxChanged: function(e){
            this.model.set({
                isChecked: $(e.target).prop('checked')
            });
        },

        onIsCheckedChanged: function(){
            var isChecked = this.model.get('isChecked');

            this.$('> label :checkbox').prop('checked', isChecked);
            this.$('> label').toggleClass('checked', isChecked);
        },

        onCostChanged: function(){
            var cost = this.model.get('cost');

            this
                .$('> label .js-cost')
                .toggle(cost > 0)
                .find('.js-val')
                .html(cost);
        }
    });
});
