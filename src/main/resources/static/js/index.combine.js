index.combine = (function () {
    let $container;

    let init = function (container) {
        $container = container;
        disable_btn();
        submit_btn();
    };

    let disable_btn = function () {
        $container.find('.choose').click(function () {
            $container.find('.choose').siblings().filter('select').attr('disabled','disabled');
            $(this).siblings().filter('select').removeAttr('disabled');
        });
    };

    let submit_btn = function () {
        $container.find('#combine').find('button').eq(2).click(function () {
            if ($container.find('#combine').find('[data-tag="month"]').attr('disabled') === 'disabled'){
                let post = {
                    action : "combine-season",
                    year : $container.find('#combine').find('[data-tag="year"]').val(),
                    season : $container.find('#combine').find('[data-tag="season"]').val(),
                    director : $container.find('#combine').find('[data-tag="director"]').val(),
                    actor : $container.find('#combine').find('[data-tag="actor"]').val(),
                    type : $container.find('#combine').find('[data-tag="type"]').val()
                };

                $('#loading').removeAttr('hidden');
                ajaxPost("/",post,function (data) {
                    if(data.number){
                        $container.find('#combine').find('[data-tag="number"]').val(data.number);
                        $container.find('#runtime').text('运行时间:'+data.runtime);
                    }
                    else {
                        $container.find('#combine').find('[data-tag="number"]').val(0);
                        $container.find('#runtime').text('运行时间:'+0);
                    }
                    $('#loading').attr('hidden','hidden');
                })
            }
            else{
                let post = {
                    action : "combine-month",
                    year : $container.find('#combine').find('[data-tag="year"]').val(),
                    month : $container.find('#combine').find('[data-tag="month"]').val(),
                    director : $container.find('#combine').find('[data-tag="director"]').val(),
                    actor : $container.find('#combine').find('[data-tag="actor"]').val(),
                    type : $container.find('#combine').find('[data-tag="type"]').val()
                };
                $('#loading').removeAttr('hidden');
                ajaxPost("/",post,function (data) {
                    if(data.number){
                        $container.find('#combine').find('[data-tag="number"]').val(data.number);
                        $container.find('#runtime').text('运行时间:'+data.runtime);
                    }
                    else {
                        $container.find('#combine').find('[data-tag="number"]').val(0);
                        $container.find('#runtime').text('运行时间:'+0);
                    }
                    $('#loading').attr('hidden','hidden');
                })
            }
        });

        $container.find('#combine').find('button').eq(3).click(function () {
            if ($container.find('#combine').find('[data-tag="month"]').attr('disabled') === 'disabled'){
                let post = {
                    action : "mysql-combine-season",
                    year : $container.find('#combine').find('[data-tag="year"]').val(),
                    season : $container.find('#combine').find('[data-tag="season"]').val(),
                    director : $container.find('#combine').find('[data-tag="director"]').val(),
                    actor : $container.find('#combine').find('[data-tag="actor"]').val(),
                    type : $container.find('#combine').find('[data-tag="type"]').val()
                };

                $('#loading').removeAttr('hidden');
                ajaxPost("/",post,function (data) {
                    if(data.number){
                        $container.find('#combine').find('[data-tag="number"]').val(data.number);
                        $container.find('#runtime').text('运行时间:'+data.runtime);
                    }
                    else {
                        $container.find('#combine').find('[data-tag="number"]').val(0);
                        $container.find('#runtime').text('运行时间:'+0);
                    }
                    $('#loading').attr('hidden','hidden');
                })
            }
            else{
                let post = {
                    action : "mysql-combine-month",
                    year : $container.find('#combine').find('[data-tag="year"]').val(),
                    month : $container.find('#combine').find('[data-tag="month"]').val(),
                    director : $container.find('#combine').find('[data-tag="director"]').val(),
                    actor : $container.find('#combine').find('[data-tag="actor"]').val(),
                    type : $container.find('#combine').find('[data-tag="type"]').val()
                };
                $('#loading').removeAttr('hidden');
                ajaxPost("/",post,function (data) {
                    if(data.number){
                        $container.find('#combine').find('[data-tag="number"]').val(data.number);
                        $container.find('#runtime').text('运行时间:'+data.runtime);
                    }
                    else {
                        $container.find('#combine').find('[data-tag="number"]').val(0);
                        $container.find('#runtime').text('运行时间:'+0);
                    }
                    $('#loading').attr('hidden','hidden');
                })
            }
        });
    };

    return {
        init : init
    }
})();