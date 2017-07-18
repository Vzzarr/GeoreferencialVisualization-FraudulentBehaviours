/**
 * Created by blackmamba on 07/07/17.
 */
var child_process = require('child_process'),
    child;
    
var exports = module.exports = {};

exports.runServer = function(m){
    child = child_process.exec(
    child_process.exec(
    'cd '+__dirname+'/nanocube-3.2.1/bin/ && cat ../data/'+m+'.dmp | ../bin/nanocube-leaf -q 29512 -f 10000'
    ,function (error, stdout, stderr) {
        console.log('stdout: ' + stdout)
        console.log('stderr: ' + stderr)
        if (error !== null) {
            console.log('exec error: ' + error)
        }
    })
)
}