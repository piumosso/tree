define('checkboxtree/ItemModel', ['backbone'], function(Backbone){
    return Backbone.Model.extend({
        defaults: {
            isChecked: false
        },

        initialize: function(){
            this.nestedCollection = null;
            this.on('change:isChecked', this.onIsCheckedChanged, this);
        },

        setNestedCollection: function(colection){
            this.nestedCollection = colection;
            this.nestedCollection.on('change:isChecked', this.correctCurrentState, this);
        },

        onIsCheckedChanged: function(){
            var isChecked = this.get('isChecked');

            if (this.nestedCollection) {
                if (!isChecked || !this.isAnyNestedModelChecked()) {
                    this.nestedCollection.each(function(model){
                        model.set({isChecked: isChecked});
                    });
                }
            }
        },

        correctCurrentState: function(){
            if (this.nestedCollection) {
                this.set({
                    isChecked: this.isAnyNestedModelChecked()
                });
            }
        },

        isAnyNestedModelChecked: function(){
            return this.nestedCollection.any(function (model) {
                return model.get('isChecked');
            });
        }
    });
});
