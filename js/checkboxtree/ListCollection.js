define('checkboxtree/ListCollection', [
    'backbone',
    'checkboxtree/ItemModel'
], function(
    Backbone,
    ItemModel
){
    return Backbone.Collection.extend({
        model: ItemModel,

        initialize: function(data, options){
            Backbone.Collection.prototype.initialize.apply(this, arguments);

            this.reduction = 0;

            if (options && options.reduction) {
                this.reduction = options.reduction;
            }
        },

        /**
         * Подсчёт суммы по услугам с учётом возможной скидки
         * @returns {*}
         */
        getCost: function(){
            var costSum;

            costSum = this.reduce(function (memo, item) {
                return memo + item.get('cost');
            }, 0);
            if (this.isAllChecked()) {
                costSum = costSum * (1 - this.reduction);
            }
            
            return costSum;
        },

        isAllChecked: function(){
            return this.all(function(model){
                return model.get('isChecked');
            });
        },

        isAnyChecked: function(){
            return this.any(function(model){
                return model.get('isChecked');
            });
        }
    });
});
