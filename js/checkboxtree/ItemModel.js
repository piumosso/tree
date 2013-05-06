define('checkboxtree/ItemModel', ['backbone'], function(Backbone){
    return Backbone.Model.extend({
        defaults: {
            isChecked: false,
            amount: 0,
            cost: 0,
            reduction: 0
        },

        initialize: function(){
            this.nestedCollection = null;
            this.on('change:isChecked', this.onIsCheckedChanged, this);
            this.on('change:isChecked', this.actualizeCost, this);
        },

        /**
         * Связывание модели и коллекции вложенных элементов
         * @param colection
         */
        setNestedCollection: function(colection){
            this.nestedCollection = colection;
            this.nestedCollection.on('change:isChecked', this.onNestedCollectionChanged, this);
            this.nestedCollection.on('change:cost', this.actualizeCost, this);
        },

        onIsCheckedChanged: function(){
            var isChecked = this.get('isChecked');

            if (this.nestedCollection) {
                // При выделении родителя выделяем всех потомков
                if (!isChecked || !this.nestedCollection.isAnyChecked()) {
                    this.nestedCollection.each(function(model){
                        model.set({isChecked: isChecked});
                    });
                }
            }
        },

        onNestedCollectionChanged: function(){
            if (this.nestedCollection) {
                // Если выбран хотя бы один потомок, выделяем родителя
                this.set({
                    isChecked: this.nestedCollection.isAnyChecked()
                });
            }
        },

        /**
         * Актуализация стоимости услуги и её выбранных подуслуг
         */
        actualizeCost: function(){
            var cost;
            
            if (this.get('isChecked')) {
                cost = this.get('amount');
                if (this.nestedCollection) {
                    cost += this.nestedCollection.getCost();
                }
            } else {
                cost = 0;
            }

            this.set({
                cost: cost
            });
        }
    });
});
