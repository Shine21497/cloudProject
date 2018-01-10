index.type = (function () {
    let $container;

    let init = function (container) {
        $container = container;
        submit_btns();
    };

    let submit_btns = function () {
        $container.find('#type').find('button').eq(0).click(function () {
            let post = {
                action : "type",
                type : $container.find('#type').find('[data-tag="type"]').val()
            };
            $('#loading').removeAttr('hidden');
            ajaxPost("/",post,function (data) {
                if(data.number){
                    $container.find('#type').find('[disabled="disabled"]').val(data.number);
                    $container.find('#runtime').text('运行时间:'+data.runtime);
                }
                else{
                    $container.find('#type').find('[disabled="disabled"]').val(0);
                    $container.find('#runtime').text('运行时间:'+0);
                }
                $('#loading').attr('hidden','hidden');
            })
        });

        $container.find('#type').find('button').eq(1).click(function () {
            let post = {
                action : "mysql-type",
                type : $container.find('#type').find('[data-tag="type"]').val()
            };
            $('#loading').removeAttr('hidden');
            ajaxPost("/",post,function (data) {
                if(data.number){
                    $container.find('#type').find('[disabled="disabled"]').val(data.number);
                    $container.find('#runtime').text('运行时间:'+data.runtime);
                }
                else{
                    $container.find('#type').find('[disabled="disabled"]').val(0);
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