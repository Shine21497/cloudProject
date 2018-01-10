index.actor = (function () {
    let $container;

    let init = function (container) {
        $container = container;
        submit_btns();
    };

    let submit_btns = function () {
        $container.find('#actor').find('button').eq(0).click(function () {
            let post = {
                action : "actor",
                actor : $container.find('#actor').find('[data-tag="actor"]').val()
            };
            $('#loading').removeAttr('hidden');
            ajaxPost("/",post,function (data) {
                if(data.main || data.participate){
                    $container.find('#actor').find('[disabled="disabled"]').eq(0).val(data.main);
                    $container.find('#actor').find('[disabled="disabled"]').eq(1).val(data.participate);
                    $container.find('#runtime').text('运行时间:'+data.runtime);
                }
                else{
                    $container.find('#actor').find('[disabled="disabled"]').eq(0).val(0);
                    $container.find('#actor').find('[disabled="disabled"]').eq(1).val(0);
                    $container.find('#runtime').text('运行时间:'+0);
                }
                $('#loading').attr('hidden','hidden');
            })
        });

        $container.find('#actor').find('button').eq(1).click(function () {
            let post = {
                action : "mysql-actor",
                actor : $container.find('#actor').find('[data-tag="actor"]').val()
            };
            $('#loading').removeAttr('hidden');
            ajaxPost("/",post,function (data) {
                if(data.main || data.participate){
                    $container.find('#actor').find('[disabled="disabled"]').eq(0).val(data.main);
                    $container.find('#actor').find('[disabled="disabled"]').eq(1).val(data.participate);
                    $container.find('#runtime').text('运行时间:'+data.runtime);
                }
                else{
                    $container.find('#actor').find('[disabled="disabled"]').eq(0).val(0);
                    $container.find('#actor').find('[disabled="disabled"]').eq(1).val(0);
                    $container.find('#runtime').text('运行时间:'+0);
                }
                $('#loading').attr('hidden','hidden');
            })
        });
    };

    return {
        init : init
    }
})();