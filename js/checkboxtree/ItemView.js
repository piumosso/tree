define('checkboxtree/ItemView', [
    'jquery',
    'backbone',
    'underscore',
    'checkboxtree/ItemModel'
], function(
    $,
    Backbone,
    _,
    ItemModel
){
    return Backbone.View.extend({
        events: {
            'change > label :checkbox': 'onCheckboxChanged'
        },

        template: _.template('<li><label class="checkbox"><input type="checkbox" name="service" ' +
                             'value="<%= id %>" <% if(checked){ %>checked="checked"<% } %> /><%= title %></label></li>'),

        initialize: function(){
            if (!this.$el.closest('body').length) {
                this.render();
            }

            if (!this.model) {
                this.model = new ItemModel({
                    isChecked: this.$(':checkbox').prop('checked')
                });
            }
            
            this.model.on('change:isChecked', this.onIsCheckedChanged, this);

            this.initializeNestedListFromDom();
        },

        initializeNestedListFromDom: function(){
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

        initializeNestedListFromData: function(data){
            var that = this;

            if (data.length) {
                require(['checkboxtree/ListView'], function(ListView){
                    var listView = new ListView({
                        data: data
                    });

                    that.$el.append(listView.$el);
                    that.model.setNestedCollection(listView.collection);
                    console.log('listView.collection.length', listView.collection.length);
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
        },

        render: function(){
            this.$el = $(this.template(this.model.toJSON()));
            this.el= this.$el[0];
            this.delegateEvents();
        }
    });
});
