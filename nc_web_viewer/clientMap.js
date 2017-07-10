function getUsers(latlngCoordinates){
	var csvName = window.location.hash.substring(1) + ".csv";
    /*$.ajax({
        type: 'GET',
        url: 'http://localhost:3000/getUsers',
        data: {latlngCoordinates:latlngCoordinates, fileName: csvName} ,
        success: function (data) {
            //createAGraph(data)
            console.log(data)
        }
    })*/
    //console.log(window.location.hash);
}


// array of coordinates of each vertex of the polygon
//var polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];
//inside([ 1.5, 1.5 ], polygon); // true
function inside(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};