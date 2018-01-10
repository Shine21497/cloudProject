index.hot = (function () {
    let $container;
    let init = function (container) {
        $container = container;
        submit_btn();
    };


    let submit_btn = function () {
        $container.find('#hot').find('button').eq(0).click(function () {
            let post = {
                action : "hot",
                name : $container.find('#hot').find('[data-tag="name"]').val()
            };
            $('#loading').removeAttr('hidden');
            ajaxPost("/",post,function (data) {
                if(data.number){
                    $container.find('#hot').find('[disabled="disabled"]').val(data.number);
                    $container.find('#runtime').text('运行时间:'+data.runtime);
                }
                else {
                    $container.find('#hot').find('[disabled="disabled"]').val(0);
                    $container.find('#runtime').text('运行时间:'+0);
                }
                $('#loading').attr('hidden','hidden');
            })
        });

        $container.find('#hot').find('button').eq(1).click(function () {
            let post = {
                action : "mysql-hot",
                name : $container.find('#hot').find('[data-tag="name"]').val()
            };
            $('#loading').removeAttr('hidden');
            ajaxPost("/",post,function (data) {
                if(data.number){
                    $container.find('#hot').find('[disabled="disabled"]').val(data.number);
                    $container.find('#runtime').text('运行时间:'+data.runtime);
                }
                else {
                    $container.find('#hot').find('[disabled="disabled"]').val(0);
                    $container.find('#runtime').text('运行时间:'+0);
                }
                $('#loading').attr('hidden','hidden');
            })
        });
    };
    return{
        init : init
    }
})();