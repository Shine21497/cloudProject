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


    if (id === 'shop') {
        var first=true;
        $("#shop tr").each(function () {
            if(!first)
            {
                $(this).remove();

            }
            else
            {
                first=false;
            }
        })
        var name=$('#s-search-name');
        var address=$('#s-search-address');
        var post = {
            action : "shop",
            address : address.val(),
            name : name.val(),
        };
        ajaxPost("/",post,function (data) {
            shop.style.display = 'block';
            if(data.list){
                data.list.forEach(function (value) {
                    addTableRow("shop","<tr>"+"<td>"+value.s_id+"</td>"+"<td>"+value.shopname+"</td>"+"<td>"+value.shopaddress+"</td>"+"<td>"+value.phonenumber+"</td>"+"</tr>",-1)
                });

            }
            else{
                alert("list null")

            }

        });
    }
    if (id === 'product') {
        var first=true;
        $("#product tr").each(function () {
            if(!first)
            {
                $(this).remove();

            }
            else
            {
                first=false;
            }
        })
        var name=$('#p-search-name');
        var type=$('#p-search-type');
        var post = {
            action : "product",
            type : type.val(),
            name : name.val()
        };
        ajaxPost("/",post,function (data) {
            product.style.display = 'block';
            if(data.list){
                data.list.forEach(function (value) {
                    addTableRow("product","<tr>"+"<td>"+value.p_id+"</td>"+"<td>"+value.productname+"</td>"+"<td>"+value.price+"</td>"+"<td>"+value.type+"</td>"+"</tr>",-1)
                });

            }
            else{
                alert("list null")

            }

        });

    }
    if (id === 'order') {
        var first=true;
        $("#order tr").each(function () {
            if(!first)
            {
                $(this).remove();

            }
            else
            {
                first=false;
            }
        })
        var year=$('#o-search-year');
        var date=$('#date');
        alert(date.val())

        var post = {
            action : "order",
            year : year.val(),
            date : date.val(),
            month:""
        };
        ajaxPost("/",post,function (data) {
            order.style.display = 'block';
            if(data.list){
                data.list.forEach(function (value) {
                    addTableRow("order","<tr>"+"<td>"+value.o_id+"</td>"+"<td>"+value.customer+"</td>"+"<td>"+value.shop+"</td>"+"<td>"+value.totalprice+"</td>"+"<td>"+value.date+"</td>"+"<td>"+value.status+"</td>"+"</tr>",-1)
                });

            }
            else{
                alert("list null")

            }

        });


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
