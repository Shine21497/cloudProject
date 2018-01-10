<!--不同界面展示-->
var shopTb=null;
var productTb=null;
var orderTb =null;
var timechart,namechart,directorchart,directorchart2,actorchart,categorychart,languagechart,combinationchart,runtimechart; //柱状图

function addTableRow(id,trHtml,row){
    //获取table最后一行 $("#tab tr:last")
    //获取table第一行 $("#tab tr").eq(0)
    //获取table倒数第二行 $("#tab tr").eq(-2)
    var $tr=$("#"+id+" tr").eq(row);
    if($tr.size()==0){
        alert("指定的table id或行数不存在！");
        return;
    }
    $tr.after(trHtml);

}
function toggle(id){
    var shop=document.getElementById('search-shop');
    var product=document.getElementById('search-product');
    var order=document.getElementById('search-order');
    var dataAnalysis=document.getElementById('data-analysis');
    if(id==='shop') {dataAnalysis.style.display='none';order.style.display='none';product.style.display='none';shop.style.display='block';}
    if(id==='product') {dataAnalysis.style.display='none';order.style.display='none';product.style.display='block';shop.style.display='none';}
    if(id==='order') {dataAnalysis.style.display='none';order.style.display='block';product.style.display='none';shop.style.display='none';}
    if(id==='data'){dataAnalysis.style.display='block';order.style.display='none';product.style.display='none';shop.style.display='none';}

}

function Table(id,type) {
    var shop = document.getElementById('shopTable');
    var product = document.getElementById('productTable');
    var order = document.getElementById('orderTable');
    var name=$('#s-search-name');
    var address=$('#s-search-address');
    alert(name.val());
    if (id === 'shop') {
        var post = {
            action : "shop",
            address : address.val(),
            name : name.val(),
        };
        ajaxPost("/",post,function (data) {
            if(data.list){
                data.list.forEach(function (value) {
                    alert(value.s_id);
                    alert(value.shopname);
                    alert(value.shopaddress)
                    addTableRow("shop","<tr>"+"<td>"+value.s_id+"</td>"+"<td>"+value.shopname+"</td>"+"<td>"+value.shopaddress+"</td>"+"<td>"+value.phonenumber+"</td>"+"</tr>",-1)
                });

            }
            else{
                alert("list null")

            }

        });
    }

    if (id === 'name') {
        name.style.display = 'block';
        $.fn.dataTable.ext.errMode = 'throw';
        var moviename = $("#sjw-search-name").val();
        if (mvNametb === null) {
            mvNametb = $('#name').DataTable({
                ajax: {
                    type: "post",
                    url: "/movie/name/search?name=" + moviename,

                    dataSrc: ""
                },
                columns: [
                    {data: "movieId"},
                    {data: "title"},
                    {data: "releaseDate"},
                    {data: "runTime"},
                    {data: "studio"},
                    {data: "publisher"}
                ],
                "bPaginage": true,
                "sPaginationType": "full_numbers",
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条",
                    "sZeroRecords": "没有找到符合条件的数据",
                    "sInfo": "当前第 _START_ - _END_ 条　共计 _TOTAL_ 条",
                    "sInfoEmpty": "没有记录",
                    "sInfoFiltered": "(从 _MAX_ 条记录中过滤)",
                    "sSearch": "搜索",
                    "sProcessing": "数据加载中...",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上一页",
                        "sNext": "下一页",
                        "sLast": "尾页"
                    }
                }
            });
            $.ajax({
                url: '/movie/ajax/showmovieName',
                dataSrc: '',
                success: function (data) {

                    var dataSrc;
                    dataSrc = data[0];
                    $('#namerelation').text(dataSrc.relation);
                    $('#namemix').text(dataSrc.mix);
                    if (namechart !== undefined) {
                        namechart.destroy();
                    }
                    namechart = Highcharts.chart('namecontainer', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '两种模型执行时间比较'
                        },
                        data: {
                            columns: [
                                [null, '执行时间'], // 分类
                                ['关系型数据仓库存储模型', dataSrc.relation],           // 第一个数据列
                                ['混合型数据存储模型', dataSrc.mix]            // 第二个数据列
                            ]
                        },
                        yAxis: {
                            allowDecimals: false,
                            title: {
                                text: 'ms',
                                rotation: 0
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name

                                    + '</b><br/>' +
                                    this.point.y + 'ms ' + this.point.name
                                        .toLowerCase();
                            }
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true, // dataLabels设为true
                                    style: {
                                        color: '#42abf8'
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }
        else {
            mvNametb.ajax.url("/movie/name/search?name=" + moviename).load();
            $.ajax({
                url: '/movie/ajax/showmovieName',
                dataSrc: '',
                success: function (data) {

                    var dataSrc;
                    dataSrc = data[0];
                    $('#namerelation').text(dataSrc.relation);
                    $('#namemix').text(dataSrc.mix);
                    if (namechart !== undefined) {
                        namechart.destroy();
                    }
                    namechart = Highcharts.chart('namecontainer', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '两种模型执行时间比较'
                        },
                        data: {
                            columns: [
                                [null, '执行时间'], // 分类
                                ['关系型数据仓库存储模型', dataSrc.relation],           // 第一个数据列
                                ['混合型数据存储模型', dataSrc.mix]            // 第二个数据列
                            ]
                        },
                        yAxis: {
                            allowDecimals: false,
                            title: {
                                text: 'ms',
                                rotation: 0
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name

                                    + '</b><br/>' +
                                    this.point.y + 'ms ' + this.point.name

                                        .toLowerCase();
                            }
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true, // dataLabels设为true
                                    style: {
                                        color: '#42abf8'
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }
    }
    if (id === 'director') {
        director.style.display = 'block';
        $.fn.dataTable.ext.errMode = 'throw';
        var direcorName = $("#sjw-search-director").val();
        if (mvDirectortb === null) {
            mvDirectortb = $('#director').DataTable({
                ajax: {
                    type: "post",
                    url: "/movie/director/search?directorName=" + direcorName,
                    dataSrc: ""

                },
                columns: [
                    {data: "movieId"},
                    {data: "title"},
                    {data: "director"},
                    {data: "releaseDate"},
                    {data: "runTime"},
                    {data: "studio"}
                ],
                "bPaginage": true,
                "sPaginationType": "full_numbers",
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条",
                    "sZeroRecords": "没有找到符合条件的数据",
                    "sInfo": "当前第 _START_ - _END_ 条　共计 _TOTAL_ 条",
                    "sInfoEmpty": "没有记录",
                    "sInfoFiltered": "(从 _MAX_ 条记录中过滤)",
                    "sSearch": "搜索",
                    "sProcessing": "数据加载中...",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上一页",
                        "sNext": "下一页",
                        "sLast": "尾页"
                    }
                }
            });
            $.ajax({
                url: '/movie/ajax/showdirector',
                dataSrc: '',
                success: function (data) {
                    var dataSrc;
                    dataSrc = data[0];
                    $('#directorrelation').text(dataSrc.relation);
                    $('#directormix').text(dataSrc.mix);
                    if (directorchart !== undefined) {
                        directorchart.destroy();
                    }
                    directorchart = Highcharts.chart('directorcontainer', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '两种模型执行时间比较'
                        },
                        data: {
                            columns: [
                                [null, '执行时间'], // 分类
                                ['关系型数据仓库存储模型', dataSrc.relation],           // 第一个数据列
                                ['混合型数据存储模型', dataSrc.mix]            // 第二个数据列
                            ]
                        },
                        yAxis: {
                            allowDecimals: false,
                            title: {
                                text: 'ms',
                                rotation: 0
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name

                                    + '</b><br/>' +
                                    this.point.y + 'ms ' + this.point.name

                                        .toLowerCase();
                            }
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true, // dataLabels设为true
                                    style: {
                                        color: '#42abf8'
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }
        else {
            mvDirectortb.ajax.url("/movie/director/search?directorName=" + direcorName).load();
            $.ajax({
                url: '/movie/ajax/showdirector',
                dataSrc: '',
                success: function (data) {

                    var dataSrc;
                    dataSrc = data[0];
                    $('#directorrelation').text(dataSrc.relation);
                    $('#directormix').text(dataSrc.mix);
                    if (directorchart !== undefined) {
                        directorchart.destroy();
                    }
                    directorchart = Highcharts.chart('directorcontainer', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '两种模型执行时间比较'
                        },
                        data: {
                            columns: [
                                [null, '执行时间'], // 分类
                                ['关系型数据仓库存储模型', dataSrc.relation],           // 第一个数据列
                                ['混合型数据存储模型', dataSrc.mix]            // 第二个数据列
                            ]
                        },
                        yAxis: {
                            allowDecimals: false,
                            title: {
                                text: 'ms',
                                rotation: 0
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name

                                    + '</b><br/>' +
                                    this.point.y + 'ms ' + this.point.name

                                        .toLowerCase();
                            }
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true, // dataLabels设为true
                                    style: {
                                        color: '#42abf8'
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }


        director2.style.display = 'block';
        if (mvDirectortb2 === null) {
            mvDirectortb2 = $('#director2').DataTable({
                ajax: {
                    type: "post",
                    url: "/movie/director/actor?directorName=" + direcorName,

                    dataSrc: ""
                },
                columns: [
                    {data: "movieId"},
                    {data: "title"},
                    {data: "director"},
                    {data: "actor"},
                    {data: "genre"}
                ],
                "bPaginage": true,
                "sPaginationType": "full_numbers",
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条",
                    "sZeroRecords": "没有找到符合条件的数据",
                    "sInfo": "当前第 _START_ - _END_ 条　共计 _TOTAL_ 条",
                    "sInfoEmpty": "没有记录",
                    "sInfoFiltered": "(从 _MAX_ 条记录中过滤)",
                    "sSearch": "搜索",
                    "sProcessing": "数据加载中...",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上一页",
                        "sNext": "下一页",
                        "sLast": "尾页"
                    }
                }
            });
            $.ajax({
                url: '/movie/ajax/showdirectorcoactor',
                dataSrc: '',
                success: function (data) {
                    var dataSrc;
                    dataSrc = data[0];
                    $('#directorrelation2').text(dataSrc.relation);
                    $('#directormix2').text(dataSrc.mix);
                    if (directorchart2 !== undefined) {
                        directorchart2.destroy();
                    }
                    directorchart2 = Highcharts.chart('directorcontainer2', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '两种模型执行时间比较'
                        },
                        data: {
                            columns: [
                                [null, '执行时间'], // 分类
                                ['关系型数据仓库存储模型', dataSrc.relation],           // 第一个数据列
                                ['混合型数据存储模型', dataSrc.mix]            // 第二个数据列
                            ]
                        },
                        yAxis: {
                            allowDecimals: false,
                            title: {
                                text: 's',
                                rotation: 0
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name

                                    + '</b><br/>' +
                                    this.point.y + 's ' + this.point.name

                                        .toLowerCase();
                            }
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true, // dataLabels设为true
                                    style: {
                                        color: '#42abf8'
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }

        else {
            mvDirectortb2.ajax.url("/movie/director/actor?directorName=" + direcorName).load();
            $.ajax({
                url: '/movie/ajax/showdirectorcoactor',
                dataSrc: '',
                success: function (data) {
                    var dataSrc;
                    dataSrc = data[0];
                    $('#directorrelation2').text(dataSrc.relation);
                    $('#directormix2').text(dataSrc.mix);
                    if (directorchart2 !== undefined) {
                        directorchart2.destroy();
                    }
                    directorchart2 = Highcharts.chart('directorcontainer2', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '两种模型执行时间比较'
                        },
                        data: {
                            columns: [
                                [null, '执行时间'], // 分类
                                ['关系型数据仓库存储模型', dataSrc.relation],           // 第一个数据列
                                ['混合型数据存储模型', dataSrc.mix]            // 第二个数据列
                            ]
                        },
                        yAxis: {
                            allowDecimals: false,
                            title: {
                                text: 's',
                                rotation: 0
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name

                                    + '</b><br/>' +
                                    this.point.y + 's ' + this.point.name

                                        .toLowerCase();
                            }
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true, // dataLabels设为true
                                    style: {
                                        color: '#42abf8'
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }
    }
    if (id === 'actor') {
        actor.style.display = 'block';
        $.fn.dataTable.ext.errMode = 'throw';
        var actorName = $("#sjw-search-actor").val();
        var url;

        if (type === 'lead')
            url = "/movie/actor/starring?actorName=";
        if (type === 'none')
            url = "/movie/actor/search?actorName=";
        if (mvActortb == null) {

            mvActortb = $('#actor').DataTable({
                ajax: {
                    type: "post",
                    url: url + actorName,
                    dataSrc: ""
                },
                columns: [
                    {data: "movieId"},
                    {data: "title"},
                    {data: "releaseDate"},
                    {data: "runTime"},
                    {data: "studio"},
                    {data: "publisher"},

                ],
                "bPaginage": true,
                "sPaginationType": "full_numbers",
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条",
                    "sZeroRecords": "没有找到符合条件的数据",
                    "sInfo": "当前第 _START_ - _END_ 条　共计 _TOTAL_ 条",
                    "sInfoEmpty": "没有记录",
                    "sInfoFiltered": "(从 _MAX_ 条记录中过滤)",
                    "sSearch": "搜索",
                    "sProcessing": "数据加载中...",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上一页",
                        "sNext": "下一页",
                        "sLast": "尾页"
                    }
                }
            });
            $.ajax({
                url: '/movie/ajax/showactor',
                dataSrc: '',
                success: function (data) {

                    var dataSrc;
                    dataSrc = data[0];
                    $('#actorrelation').text(dataSrc.relation);
                    $('#actormix').text(dataSrc.mix);
                    if (actorchart !== undefined) {
                        actorchart.destroy();
                    }
                    actorchart = Highcharts.chart('actorcontainer', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '两种模型执行时间比较'
                        },
                        data: {
                            columns: [
                                [null, '执行时间'], // 分类
                                ['关系型数据仓库存储模型', dataSrc.relation],           // 第一个数据列
                                ['混合型数据存储模型', dataSrc.mix]            // 第二个数据列
                            ]
                        },
                        yAxis: {
                            allowDecimals: false,
                            title: {
                                text: 'ms',
                                rotation: 0
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name

                                    + '</b><br/>' +
                                    this.point.y + 'ms ' + this.point.name

                                        .toLowerCase();
                            }
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true, // dataLabels设为true
                                    style: {
                                        color: '#42abf8'
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }
        else {
            mvActortb.ajax.url(url + actorName).load();
            $.ajax({
                url: '/movie/ajax/showactor',
                dataSrc: '',
                success: function (data) {

                    var dataSrc;
                    dataSrc = data[0];
                    $('#actorrelation').text(dataSrc.relation);
                    $('#actormix').text(dataSrc.mix);
                    if (actorchart !== undefined) {
                        actorchart.destroy();
                    }
                    actorchart = Highcharts.chart('actorcontainer', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '两种模型执行时间比较'
                        },
                        data: {
                            columns: [
                                [null, '执行时间'], // 分类
                                ['关系型数据仓库存储模型', dataSrc.relation],           // 第一个数据列
                                ['混合型数据存储模型', dataSrc.mix]            // 第二个数据列
                            ]
                        },
                        yAxis: {
                            allowDecimals: false,
                            title: {
                                text: 'ms',
                                rotation: 0
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name

                                    + '</b><br/>' +
                                    this.point.y + 'ms ' + this.point.name

                                        .toLowerCase();
                            }
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true, // dataLabels设为true
                                    style: {
                                        color: '#42abf8'
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }
    }
    if (id === 'category') {
        category.style.display = 'block';
        $.fn.dataTable.ext.errMode = 'throw';
        var typename = $("#sjw-search-category").val();
        if (mvTypetb == null) {
            var dataSrc;
            mvTypetb = $('#category').DataTable({
                ajax: {
                    type: "post",
                    url: "/movie/genere/search?genere=" + typename,
                    dataSrc: ""
                },
                columns: [
                    {data: "movieId"},
                    {data: "title"},
                    {data: "type"},
                    {data: "releaseDate"},
                    {data: "runTime"},
                    {data: "studio"}
                ],
                "bPaginage": true,
                "sPaginationType": "full_numbers",
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条",
                    "sZeroRecords": "没有找到符合条件的数据",
                    "sInfo": "当前第 _START_ - _END_ 条　共计 _TOTAL_ 条",
                    "sInfoEmpty": "没有记录",
                    "sInfoFiltered": "(从 _MAX_ 条记录中过滤)",
                    "sSearch": "搜索",
                    "sProcessing": "数据加载中...",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上一页",
                        "sNext": "下一页",
                        "sLast": "尾页"
                    }
                }
            });
            $.ajax({
                url: '/movie/ajax/showcategory',
                dataSrc: '',
                success: function (data) {
                    dataSrc = data[0];
                    if (categorychart !== undefined) {
                        categorychart.destroy();
                    }
                    $('#genrerelation').text(dataSrc.relation);
                    $('#genremix').text(dataSrc.mix);
                    categorychart = Highcharts.chart('categorycontainer', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '两种模型执行时间比较'
                        },
                        data: {
                            columns: [
                                [null, '执行时间'], // 分类
                                ['关系型数据仓库存储模型', dataSrc.relation],           // 第一个数据列
                                ['混合型数据存储模型', dataSrc.mix]            // 第二个数据列
                            ]
                        },
                        yAxis: {
                            allowDecimals: false,
                            title: {
                                text: 'ms',
                                rotation: 0
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name

                                    + '</b><br/>' +
                                    this.point.y + 'ms ' + this.point.name

                                        .toLowerCase();
                            }
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true, // dataLabels设为true
                                    style: {
                                        color: '#42abf8'
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }
        else {
            mvTypetb.ajax.url("/movie/genere/search?genere=" + typename).load();
            $.ajax({
                url: '/movie/ajax/showcategory',
                dataSrc: '',
                success: function (data) {
                    var dataSrc;
                    dataSrc = data[0];
                    $('#genrerelation').text(dataSrc.relation);
                    $('#genremix').text(dataSrc.mix);
                    if (categorychart !== undefined) {
                        categorychart.destroy();
                    }
                    categorychart = Highcharts.chart('categorycontainer', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '两种模型执行时间比较'
                        },
                        data: {
                            columns: [
                                [null, '执行时间'], // 分类
                                ['关系型数据仓库存储模型', dataSrc.relation],           // 第一个数据列
                                ['混合型数据存储模型', dataSrc.mix]            // 第二个数据列
                            ]
                        },
                        yAxis: {
                            allowDecimals: false,
                            title: {
                                text: 'ms',
                                rotation: 0
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name

                                    + '</b><br/>' +
                                    this.point.y + 'ms ' + this.point.name

                                        .toLowerCase();
                            }
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true, // dataLabels设为true
                                    style: {
                                        color: '#42abf8'
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }

    }
    if (id === 'combination') {
        combination.style.display = 'block';
        $.fn.dataTable.ext.errMode = 'throw';
        var cdate = document.getElementById('cdate').value;
        var cname = document.getElementById('cname').value;
        var cactor = document.getElementById('cactor').value;
        var cdirector = document.getElementById('cdirector').value;
        var cgenre = document.getElementById('cgenre').value;
        if (mvCombinationtb === null) {
            mvCombinationtb = $('#combination').DataTable({
                ajax: {
                    url: '/movie/combination/search',
                    type: 'post',
                    data: {
                        "date": String(cdate),
                        "name": String(cname),
                        "actor": String(cactor),
                        "director": String(cdirector),
                        "genre": String(cgenre)
                    },
                    dataSrc: ""

                },
                columns: [{data: "movieId"},
                    {data: "title"},
                    {data: "releaseDate"},
                    {data: "runTime"},
                    {data: "studio"},
                    {data: "publisher"}],
                "bPaginage": true,
                "sPaginationType": "full_numbers",
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条",
                    "sZeroRecords": "没有找到符合条件的数据",
                    "sInfo": "当前第 _START_ - _END_ 条　共计 _TOTAL_ 条",
                    "sInfoEmpty": "没有记录",
                    "sInfoFiltered": "(从 _MAX_ 条记录中过滤)",
                    "sSearch": "搜索",
                    "sProcessing": "数据加载中...",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上一页",
                        "sNext": "下一页",
                        "sLast": "尾页"
                    }
                }
            });
            $.ajax({
                url: '/movie/multiple/showcombination',
                dataSrc: '',
                success: function (data) {
                    var dataSrc;
                    dataSrc = data[0];
                    $('#combinationrelation').text(dataSrc.relation);
                    $('#combinationmix').text(dataSrc.mix);
                    if (combinationchart !== undefined) {
                        combinationchart.destroy();
                    }
                    combinationchart = Highcharts.chart('conbinationcontainer', {
                        chart: {
                            type: 'column'
                        },
                        title: {

                            text: '两种模型执行时间比较'
                        },
                        data: {
                            columns: [
                                [null, '执行时间'], // 分类
                                ['关系型数据仓库存储模型', dataSrc.relation],           // 第一个数据列
                                ['混合型数据存储模型', dataSrc.mix]            // 第二个数据列
                            ]
                        },
                        yAxis: {
                            allowDecimals: false,
                            title: {
                                text: 'ms',
                                rotation: 0
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name

                                    + '</b><br/>' +
                                    this.point.y + 'ms ' + this.point.name
                                        .toLowerCase();
                            }
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true, // dataLabels设为true
                                    style: {
                                        color: '#42abf8'
                                    }
                                }
                            }
                        }
                    });
                }

            });
        }
        else {
            mvCombinationtb.ajax.url('/movie/combination/search').load();
            $.ajax({
                url: '/movie/multiple/showcombination',
                dataSrc: '',
                success: function (data) {

                    var dataSrc;
                    dataSrc = data[0];
                    $('#combinationrelation').text(dataSrc.relation);
                    $('#combinationmix').text(dataSrc.mix);
                    if (combinationchart !== undefined) {
                        combinationchart.destroy();
                    }
                    combinationchart = Highcharts.chart('conbinationcontainer', {
                        chart: {
                            type: 'column'
                        },
                        title: {

                            text: '两种模型执行时间比较'
                        },
                        data: {
                            columns: [
                                [null, '执行时间'], // 分类
                                ['关系型数据仓库存储模型', dataSrc.relation],           // 第一个数据列
                                ['混合型数据存储模型', dataSrc.mix]            // 第二个数据列
                            ]
                        },
                        yAxis: {
                            allowDecimals: false,
                            title: {
                                text: 'ms',
                                rotation: 0
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name

                                    + '</b><br/>' +
                                    this.point.y + 'ms ' + this.point.name
                                        .toLowerCase();
                            }
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true, // dataLabels设为true
                                    style: {
                                        color: '#42abf8'
                                    }
                                }
                            }
                        }
                    });
                }

            });
        }
    }
    if (id === 'language') {
        var languagename = $("#sjw-search-language").val();
        language.style.display = 'block';
        $.fn.dataTable.ext.errMode = 'throw';
        if (mvLanguagetb == null) {
            mvLanguagetb = $('#language').DataTable({
                ajax: {
                    url: '/movie/language/search?language=' + languagename,
                    dataSrc: "",
                    type: "post"
                },
                columns: [
                    {data: "movieId"},
                    {data: "title"},
                    {data: "releaseDate"},
                    {data: "runTime"},
                    {data: "studio"},
                    {data: "publisher"}],
                "bPaginage": true,
                "sPaginationType": "full_numbers",
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条",
                    "sZeroRecords": "没有找到符合条件的数据",
                    "sInfo": "当前第 _START_ - _END_ 条　共计 _TOTAL_ 条",
                    "sInfoEmpty": "没有记录",
                    "sInfoFiltered": "(从 _MAX_ 条记录中过滤)",
                    "sSearch": "搜索",
                    "sProcessing": "数据加载中...",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上一页",
                        "sNext": "下一页",
                        "sLast": "尾页"
                    }
                }
            });
            $.ajax({
                url: '/movie/ajax/showlanguage',
                dataSrc: '',
                success: function (data) {

                    var dataSrc;
                    dataSrc = data[0];
                    $('#languagerelation').text(dataSrc.relation);
                    $('#languagemix').text(dataSrc.mix);
                    if (languagechart !== undefined) {
                        languagechart.destroy();
                    }
                    languagechart = Highcharts.chart('languagecontainer', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '两种模型执行时间比较'
                        },
                        data: {
                            columns: [
                                [null, '执行时间'], // 分类
                                ['关系型数据仓库存储模型', dataSrc.relation],           // 第一个数据列
                                ['混合型数据存储模型', dataSrc.mix]            // 第二个数据列
                            ]
                        },
                        yAxis: {
                            allowDecimals: false,
                            title: {
                                text: 'ms',
                                rotation: 0
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name

                                    + '</b><br/>' +
                                    this.point.y + 'ms ' + this.point.name

                                        .toLowerCase();
                            }
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true, // dataLabels设为true
                                    style: {
                                        color: '#42abf8'
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }
        else {
            mvLanguagetb.ajax.url('/movie/language/search?language=' + languagename).load();
            $.ajax({
                url: '/movie/ajax/showlanguage',
                dataSrc: '',
                success: function (data) {

                    var dataSrc;
                    dataSrc = data[0];
                    $('#languagerelation').text(dataSrc.relation);
                    $('#languagemix').text(dataSrc.mix);
                    if (languagechart !== undefined) {
                        languagechart.destroy();
                    }
                    languagechart = Highcharts.chart('languagecontainer', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '两种模型执行时间比较'
                        },
                        data: {
                            columns: [
                                [null, '执行时间'], // 分类
                                ['关系型数据仓库存储模型', dataSrc.relation],           // 第一个数据列
                                ['混合型数据存储模型', dataSrc.mix]            // 第二个数据列
                            ]
                        },
                        yAxis: {
                            allowDecimals: false,
                            title: {
                                text: 'ms',
                                rotation: 0
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name

                                    + '</b><br/>' +
                                    this.point.y + 'ms ' + this.point.name

                                        .toLowerCase();
                            }
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true, // dataLabels设为true
                                    style: {
                                        color: '#42abf8'
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }
    }
    if (id === 'runtime') {
        runtime.style.display = 'block';
        $.fn.dataTable.ext.errMode = 'throw';
        var time1 = document.getElementById('time1').value;
        var time2 = document.getElementById('time2').value;
        if (mvRunTimetb === null) {
            mvRunTimetb = $('#rtime').DataTable({
                ajax: {
                    type: "post",
                    url: "/movie/runtime/search",
                    dataSrc: "",
                    data: {
                        "time1": String(time1),
                        "time2": String(time2)
                    }
                },
                columns: [
                    {data: "movieId"},
                    {data: "title"},
                    {data: "releaseDate"},
                    {data: "runTime"},
                    {data: "studio"},
                    {data: "publisher"}
                ],

                "bPaginage": true,
                "sPaginationType": "full_numbers",
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条",
                    "sZeroRecords": "没有找到符合条件的数据",
                    "sInfo": "当前第 _START_ - _END_ 条　共计 _TOTAL_ 条",
                    "sInfoEmpty": "没有记录",
                    "sInfoFiltered": "(从 _MAX_ 条记录中过滤)",
                    "sSearch": "搜索",
                    "sProcessing": "数据加载中...",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上一页",
                        "sNext": "下一页",
                        "sLast": "尾页"
                    }
                }
            });
            $.ajax({
                url: '/movie/multiple/showruntime',
                dataSrc: '',
                success: function (data) {

                    var dataSrc;
                    dataSrc = data[0];
                    $('#runtimerelation').text(dataSrc.relation);
                    $('#runtimemix').text(dataSrc.mix);
                    if (runtimechart !== undefined) {
                        runtimechart.destroy();
                    }
                    runtimechart = Highcharts.chart('runtimecontainer', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '两种模型执行时间比较'
                        },
                        data: {
                            columns: [
                                [null, '执行时间'], // 分类
                                ['关系型数据仓库存储模型', dataSrc.relation],           // 第一个数据列
                                ['混合型数据存储模型', dataSrc.mix]            // 第二个数据列
                            ]
                        },
                        yAxis: {
                            allowDecimals: false,
                            title: {
                                text: 'ms',
                                rotation: 0
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name

                                    + '</b><br/>' +
                                    this.point.y + 'ms ' + this.point.name
                                        .toLowerCase();
                            }
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true, // dataLabels设为true
                                    style: {
                                        color: '#42abf8'
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }
        else {
            mvNametb.ajax.url("/movie/runtime/search").load();
            $.ajax({
                url: '/movie/multiple/showruntime',
                dataSrc: '',
                success: function (data) {

                    var dataSrc;
                    dataSrc = data[0];
                    $('#runtimerelation').text(dataSrc.relation);
                    $('#runtimemix').text(dataSrc.mix);
                    if (runtimechart !== undefined) {
                        runtimechart.destroy();
                    }
                    runtimechart = Highcharts.chart('runtimecontainer', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '两种模型执行时间比较'
                        },
                        data: {
                            columns: [
                                [null, '执行时间'], // 分类
                                ['关系型数据仓库存储模型', dataSrc.relation],           // 第一个数据列
                                ['混合型数据存储模型', dataSrc.mix]            // 第二个数据列
                            ]
                        },
                        yAxis: {
                            allowDecimals: false,
                            title: {
                                text: 'ms',
                                rotation: 0
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name

                                    + '</b><br/>' +
                                    this.point.y + 'ms ' + this.point.name
                                        .toLowerCase();
                            }
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true, // dataLabels设为true
                                    style: {
                                        color: '#42abf8'
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }
    }
}
var seasonArray, dayArray, monthArray, date, year, dateType;

function timeChoice() {
    date = document.getElementById('myID').value;
    var type = document.getElementById('publicationdate');
    if (type.checked) {
        dateType = 0; //0为出版日期 publicationdate 1为上映日期 releasedate
    }
    else {
        dateType = 1;
    }
    if (date === '') {
        var yearDiv = document.getElementById('myYear');
        for (var i = 0; i <= 2028 - 1888; i++) {
            if (yearDiv.options[i].selected) {
                year = yearDiv.options[i].value;
            }
        }


        var season = document.getElementsByName('season');
        seasonArray = [];
        for (var i = 0, j = 0; i < season.length; i++) {
            if (season[i].checked) {
                seasonArray[j] = season[i].value;
                j++;
            }
        }
        var month = document.getElementsByName('month');
        monthArray = [];
        for (var i = 0, j = 0; i < month.length; i++) {
            if (month[i].checked) {
                monthArray[j] = month[i].value;
                j++;
            }
        }
        var day = document.getElementsByName('day');
        dayArray = [];
        for (var i = 0, j = 0; i < day.length; i++) {
            if (day[i].checked) {
                dayArray[j] = day[i].value;
                j++;
            }
        }
    }
}
