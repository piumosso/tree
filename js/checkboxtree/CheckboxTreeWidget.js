define('checkboxtree/CheckboxTreeWidget', [
    'backbone',
    'underscore',
    'checkboxtree/ListView'
], function(
    Backbone,
    _,
    ListView
){
    return Backbone.View.extend({
        initialize: function(options){
            if (options && options.data) {
                this.initializeFromData(options.data, options.checked);
            } else {
                this.initializeFromDom();
            }
        },

        initializeFromDom: function(){
            var $list = this.$('> ul');

            if ($list.length) {
                new ListView({
                    el: $list
                });
            }
        },

        /**
         * Инициализация виджета данными
         *
         * @param data Плоский массив данных [{id: Number, parentId: Number, title: String}]
         * @param checked Массив выбранных id
         */
        initializeFromData: function(data, checked){
            var trees = {}, listView;

            // Строим отображение id: данные
            _.each(data, function(item){
                trees[item.id] = _.extend({
                    checked: false,
                    children: []
                }, item);
            });

            // Связываем дочерние пункты с родительскими
            _.each(data, function(item){
                if (item.parentId && trees[item.parentId]) {
                    trees[item.parentId].children.push(trees[item.id]);
                }
            });

            // Помечаем выбранными определённые checked пункты
            if (checked) {
                _.each(checked, function(id){
                    if(trees[id]) {
                        trees[id].checked = true;
                    }
                });
            }

            // Создаём родительский ListView
            listView = new ListView({
                data: _.filter(trees, function(item){
                    return !item.parentId;
                })
            });
            this.$el.append(listView.$el);
        }
    });
});
