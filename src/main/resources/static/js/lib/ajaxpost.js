let ajaxPost = function (url,result,success) {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType : "json",
        type : 'POST',
        url : url,
        data : JSON.stringify(result),
        success : success
    });
};

let appendTable = function (tableId,tr_em,...$tds) {
    let $tr_em = tr_em.clone();
    $tr_em.find('td').each(function (index,val) {
        $(this).text($tds[index]);
    });
    $('#'+tableId).find('tbody').append($tr_em);
};