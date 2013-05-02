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
            this.model = new ItemModel({
                isChecked: this.$(':checkbox').prop('checked')
            });
            this.model.on('change:isChecked', this.onIsCheckedChanged, this);

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
            this.$('> label :checkbox').prop('checked', this.model.get('isChecked'));
        }
    });
});
