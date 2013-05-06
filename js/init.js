require([
    'jquery',
    'checkboxtree/CheckboxTreeWidget'
], function(
    $,
    CheckboxTreeWidget
){
    $(function(){
        // Выполняем код инициализации примера
        $('.js-code').each(function(){
            var $code = $(this);

            eval($code.text());
        });
    });
});
