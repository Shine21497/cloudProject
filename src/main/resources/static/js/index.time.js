index.time = (function () {
    let $container;

    let init = function (container) {
        $container = container;
        submit_btn();
    };

    let submit_btn = function () {
        let $btns = $container.find('#time').find('button');

        $btns.eq(0).click(function () {
            let post = {
                action : "time-month",
                year : $container.find('#time').find('[data-tag="year"]').val(),
                month : $container.find('#time').find('[data-tag="month"]').val()
            };
            $('#loading').removeAttr('hidden');
            ajaxPost("/",post,function (data) {
                if(data.number){
                    $container.find('#time').find('[disabled="disabled"]').eq(0).val(data.number);
                    $container.find('#runtime').text('运行时间:'+data.runtime);
                }
                else{
                    $container.find('#time').find('[disabled="disabled"]').eq(0).val(0);
                    $container.find('#runtime').text('运行时间:'+0);
                }
                $('#loading').attr('hidden','hidden');
            });
        });



        $btns.eq(1).click(function () {
            let post = {
                action : "time-season",
                year : $container.find('#time').find('[data-tag="year"]').val(),
                season : $container.find('#time').find('[data-tag="season"]').val()
            };
            $('#loading').removeAttr('hidden');
            ajaxPost("/",post,function (data) {
                if(data.number){
                    $container.find('#time').find('[disabled="disabled"]').eq(0).val(data.number);
                    $container.find('#runtime').text('运行时间:'+data.runtime);
                }
                else{
                    $container.find('#time').find('[disabled="disabled"]').eq(0).val(0);
                    $container.find('#runtime').text('运行时间:'+0);
                }
                $('#loading').attr('hidden','hidden');
            });
        });

        $btns.eq(2).click(function () {
            let post = {
                action : "mysql-time-month",
                year : $container.find('#time').find('[data-tag="year"]').val(),
                month : $container.find('#time').find('[data-tag="month"]').val()
            };
            $('#loading').removeAttr('hidden');
            ajaxPost("/",post,function (data) {
                if(data.number){
                    $container.find('#time').find('[disabled="disabled"]').eq(0).val(data.number);
                    $container.find('#runtime').text('运行时间:'+data.runtime);
                }
                else{
                    $container.find('#time').find('[disabled="disabled"]').eq(0).val(0);
                    $container.find('#runtime').text('运行时间:'+0);
                }
                $('#loading').attr('hidden','hidden');
            });
        });

        $btns.eq(3).click(function () {
            let post = {
                action : "mysql-time-season",
                year : $container.find('#time').find('[data-tag="year"]').val(),
                season : $container.find('#time').find('[data-tag="season"]').val()
            };
            $('#loading').removeAttr('hidden');
            ajaxPost("/",post,function (data) {
                if(data.number){
                    $container.find('#time').find('[disabled="disabled"]').eq(0).val(data.number);
                    $container.find('#runtime').text('运行时间:'+data.runtime);
                }
                else{
                    $container.find('#time').find('[disabled="disabled"]').eq(0).val(0);
                    $container.find('#runtime').text('运行时间:'+0);
                }
                $('#loading').attr('hidden','hidden');
            });
        });

        $btns.eq(4).click(function () {
            let post = {
                action : "time-week",
                week : $container.find('#time').find('[data-tag="year"]').val()
            };
            $('#loading').removeAttr('hidden');
            ajaxPost("/",post,function (data) {
                if(data.number){
                    $container.find('#time').find('[disabled="disabled"]').eq(1).val(data.number);
                    $container.find('#runtime').text('运行时间:'+data.runtime);
                }
                else{
                    $container.find('#time').find('[disabled="disabled"]').eq(1).val(0);
                    $container.find('#runtime').text('运行时间:'+0);
                }
                $('#loading').attr('hidden','hidden');
            });
        });

        $btns.eq(5).click(function () {
            let post = {
                action : "mysql-time-week",
                week : $container.find('#time').find('[data-tag="year"]').val()
            };
            $('#loading').removeAttr('hidden');
            ajaxPost("/",post,function (data) {
                if(data.number){
                    $container.find('#time').find('[disabled="disabled"]').eq(1).val(data.number);
                    $container.find('#runtime').text('运行时间:'+data.runtime);
                }
                else{
                    $container.find('#time').find('[disabled="disabled"]').eq(1).val(0);
                    $container.find('#runtime').text('运行时间:'+0);
                }
                $('#loading').attr('hidden','hidden');
            });
        });
    };

    return {
        init : init
    }
})();