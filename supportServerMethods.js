/**
 * Created by blackmamba (male) on 10/07/17.


 NOTE
 change the var "password" with the password to access to Neo4j
 and the var "Basic" with the result of this command UNIX: 'echo -n neo4j:password | base64'
 where password is the value to access to Neo4j
 */

var password = 'root';
var Basic = "bmVvNGo6cm9vdA=="

var exports = module.exports = {};
var request = require('request');

var child_process = require('child_process');
var localHostQuery =  require('./runShellFile.js');
var localHostPython = require('./runPythonServer.js');
var txUrl = "http://neo4j:' + password + '@localhost:7474/db/data/transaction/commit";

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
    return new Promise(function (resolve, reject) {
        request.post({
                uri:txUrl,
                headers:{
                    "Authorization": "Basic " + Basic
                },
                json:{
                    statements: query
                }
            },
            function(err,res){
                if(err){
                    console.log('ERROR', err)
                    reject(err)
                }
                else
                    resolve(res.body)
            })
    })
}

exports.runQueryServer = function(mes){
    var lsof = require('lsof');
    localHostQuery.runServer(mes)
    setTimeout(function(){lsof.rawTcpPort(29512, function(data){
        console.log(data)
        var fs = require('fs')
        fs.writeFileSync('guarda', data[data.length-1].pid)
        fs.close
        })}, 50)
}

exports.runPythonServer = function(){
    localHostPython.runServer()
}