function getUsers(polygon){
    var csvName = window.location.hash.substring(1)
    var info = {
        fileName : csvName,
        perimeter : polygon
    }
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/getUsers',
        //headers: {'Access-Control-Allow-Origin': 'http://localhost:3000/getUsers'},
        data: { data: info } ,
        crossDomain: true,
        dataType: 'jsonp',
        success: function (data) {
            openRightMenu(data)
        }
    })
}

