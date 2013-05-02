define('checkboxtree/ListCollection', [
    'backbone',
    'checkboxtree/ItemModel'
], function(
    Backbone,
    ItemModel
){
    return Backbone.Collection.extend({
        model: ItemModel
    });
});
