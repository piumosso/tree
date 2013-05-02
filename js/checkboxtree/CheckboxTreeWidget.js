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
                new ListView({
                    el: $list
                });
            }
        }
    });
});
