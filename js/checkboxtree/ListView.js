define('checkboxtree/ListView', [
    'backbone',
    'checkboxtree/ItemView',
    'checkboxtree/ItemModel',
    'checkboxtree/ListCollection'
], function(
    Backbone,
    ItemView,
    ItemModel,
    ListCollection
){
    var ListView = Backbone.View.extend({
        template: '<ul class="unstyled"></ul>',

        initialize: function(options){
            this.collection = new ListCollection();

            if (options && options.data) {
                this.render();
                this.initializeFromData(options.data);
            } else {
                this.initializeFromDom();
            }
        },

        initializeFromDom: function(){
            var that = this;

            this.$('> li').each(function(){
                var itemView = new ItemView({
                    el: this
                });

                that.collection.add(itemView.model);
            });
        },

        initializeFromData: function(data){
            var that = this;

            _.each(data, function(item){
                var itemView, listView;

                itemView = new ItemView({
                    model: new ItemModel(item)
                });
                that.$el.append(itemView.$el);
                that.collection.add(itemView.model);
                itemView.initializeNestedListFromData(item.children);
            });
        },

        render: function(){
            this.$el = $(this.template);
        }
    });

    return ListView;
});
