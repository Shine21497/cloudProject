index.name = (function () {
    let $container;

    let init = function (container) {
        $container = container;
        submit_btn();
    };

    let submit_btn = function () {
        $container.find('#name').find('button').eq(0).click(function () {
            let post = {
                action : "name",
                name : $container.find('#name').find('[data-tag="name"]').val()
            };
            $('#loading').removeAttr('hidden');
            ajaxPost("/",post,function (data) {
                if(data.number){
                    $container.find('#name').find('[disabled="disabled"]').val(data.number);
                    $container.find('#runtime').text('运行时间:'+data.runtime);
                }
                else {
                    $container.find('#name').find('[disabled="disabled"]').val(0);
                    $container.find('#runtime').text('运行时间:'+0);
                }
                $('#loading').attr('hidden','hidden');
            })
        });

        $container.find('#name').find('button').eq(1).click(function () {
            let post = {
                action : "mysql-name",
                name : $container.find('#name').find('[data-tag="name"]').val()
            };
            $('#loading').removeAttr('hidden');
            ajaxPost("/",post,function (data) {
                if(data.number){
                    $container.find('#name').find('[disabled="disabled"]').val(data.number);
                    $container.find('#runtime').text('运行时间:'+data.runtime);
                }
                else {
                    $container.find('#name').find('[disabled="disabled"]').val(0);
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