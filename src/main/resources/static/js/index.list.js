index.list = (function () {
    let $container;

    let init = function (container) {
        $container = container;
        btn();
    };

    let btn = function () {
        let $tr = $container.find('#listtable').find('tbody tr').first().clone();
        $container.find('#listtable').find('tbody tr').remove();
        $container.find('#list').find('button').eq(0).click(function () {
            let year = $container.find('#list').find('input').filter('[data-tag="year"]').val();
            let month = $container.find('#list').find('select').filter('[data-tag="month"]').val();
            let director = $container.find('#list').find('input').filter('[data-tag="director"]').val();
            let actor = $container.find('#list').find('input').filter('[data-tag="actor"]').val();

            let post = {
                action : "list",
                year : year,
                month : month,
                director : director,
                actor : actor
            };
            $('#loading').removeAttr('hidden');
            ajaxPost("/",post,function (data) {
                if(data.list){
                    $container.find('#table-row').children().remove();
                    $container.find('#table-row').append(index.getTable().clone());
                    data.list.forEach(function (value) {
                        appendTable('listtable',$tr,value.name,value.time,value.type,value.director,value.actor,value.comment);
                    });
                    $container.find('#runtime').text('运行时间:'+data.runtime);
                    $container.find('#listtable').DataTable();
                }
                else{
                    $container.find('#runtime').text('运行时间:'+0);
                }
                $('#loading').attr('hidden','hidden');
            });
        });

        $container.find('#list').find('button').eq(1).click(function () {
            let year = $container.find('#list').find('input').filter('[data-tag="year"]').val();
            let month = $container.find('#list').find('select').filter('[data-tag="month"]').val();
            let director = $container.find('#list').find('input').filter('[data-tag="director"]').val();
            let actor = $container.find('#list').find('input').filter('[data-tag="actor"]').val();

            let post = {
                action : "mysql-list",
                year : year,
                month : month,
                director : director,
                actor : actor
            };
            $('#loading').removeAttr('hidden');
            ajaxPost("/",post,function (data) {
                if(data.list){
                    $container.find('#table-row').children().remove();
                    $container.find('#table-row').append(index.getTable().clone());
                    data.list.forEach(function (value) {
                        appendTable('listtable',$tr,value.name,value.time,value.type,value.director,value.actor,value.comment);
                    });
                    $container.find('#runtime').text('运行时间:'+data.runtime);
                    $container.find('#listtable').DataTable();
                }
                else{
                    $container.find('#runtime').text('运行时间:'+0);
                }
                $('#loading').attr('hidden','hidden');
            });
        })
    };

    return{
        init : init
    }
})();