require([
    'jquery',
    'checkboxtree/CheckboxTreeWidget'
], function(
    $,
    CheckboxTreeWidget
){
    $(function(){
        // Выполняем код примеров
        $('.js-code').each(function(){
            var $code = $(this);

            eval($code.text());
        });
    });
});
