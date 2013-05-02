define('checkboxtree/ListView', [
    'backbone',
    'checkboxtree/ItemView',
    'checkboxtree/ListCollection'
], function(
    Backbone,
    ItemView,
    ListCollection
){
    return Backbone.View.extend({
        initialize: function(){
            var that = this;

            this.collection = new ListCollection();
            this.$('> li').each(function(){
                var itemView = new ItemView({
                    el: this
                });

                that.collection.add(itemView.model);
            });
        }
    });
});
