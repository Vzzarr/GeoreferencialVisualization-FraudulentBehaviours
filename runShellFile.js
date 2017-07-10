/**
 * Created by blackmamba on 07/07/17.
 */
var child_process = require('child_process'),
    child;

process.on('message', function(m) {

    child = child_process.exec('cd && cd nanocube-3.2.1/bin/ && cat ../data/'+m+'.dmp | ../bin/nanocube-leaf -q 29512 -f 10000', function (error, stdout, stderr) {
        console.log('stdout: ' + stdout)
        console.log('stderr: ' + stderr)
        if (error !== null) {
            console.log('exec error: ' + error)
        }
    })

})
/*

 child = child_process.exec('cd && cd nanocube-3.2.1/bin/ && cat ../data/'+m+'.dmp | ../bin/nanocube-leaf -q 29512 -f 10000', function (error, stdout, stderr) {
 console.log('stdout: ' + stdout);
 console.log('stderr: ' + stderr);
 if (error !== null) {
 console.log('exec error: ' + error);
 }
 })

 child2 = exec('cat ../data/'+m+'.dmp | ../bin/nanocube-leaf -q 29512 -f 10000',
 function (error, stdout, stderr) {
 console.log('stdout: ' + stdout);
 console.log('stderr: ' + stderr);
 if (error !== null) {
 console.log('exec error: ' + error);
 }
 })




child2 = child.fork
module.exports = {
    returnIDProcess : function (e) {
            child = exec('sh ~/Desktop/simple.sh '+e,
            function (error, stdout, stderr) {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
 });
    }
}*/

