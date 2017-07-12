/**
 * Created by blackmamba on 10/07/17.
 */

var exports = module.exports = {};
var request = require('request');

var child_process = require('child_process');
var localHostQuery =  child_process.fork('./runShellFile.js')
var localHostPython = child_process.fork('./runPythonServer.js')
var txUrl = "http://neo4j:ciao@localhost:7474/db/data/transaction/commit";

exports.inside = function(point, perimeter) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = perimeter.length - 1; i < perimeter.length; j = i++) {
        var xi = perimeter[i][0], yi = perimeter[i][1];
        var xj = perimeter[j][0], yj = perimeter[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

exports.doDatabaseOperation = function (query, params) {
    console.log('ciao')
    return new Promise(function (resolve, reject) {
        request.post({
                uri:txUrl,
                headers:{
                    "Authorization": "Basic bmVvNGo6bmVvNGoy"
                },
                json:{
                    statements:[
                        {
                            statement:query,
                            parameters:params
                        }
                    ]
                }
            },
            function(err,res){
                if(err)
                    reject(err)
                else
                    resolve(res.body)
            })
    })
}

exports.avviaServerQuery = function(mes){
    localHostQuery.on('message', function(m) {
        // Receive results from localHostQuery process
        console.log('received: ' + m);
    })

    localHostQuery.send(mes)
}

exports.avviaServerPython = function(){
    localHostPython.on('message', function(m) {
        // Receive results from localHostQuery process
        console.log('received: '+m);
    })

    localHostPython.send('ciao')
}

exports.pythonPID = function () {
    return localHostPython.func()
}
