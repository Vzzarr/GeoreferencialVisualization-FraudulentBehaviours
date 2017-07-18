/**
 * Created by blackmamba on 08/07/17.
 */

var child_process = require('child_process'),
    child;

var exports = module.exports = {};
exports.runServer = function(){
     child = child_process.exec(
        'cd '+__dirname+'/nanocube-3.2.1/extra/nc_web_viewer && python -m SimpleHTTPServer 8000'
        , function (error, stdout, stderr) {
        console.log('stdout: ' + stdout)
        console.log('stderr: ' + stderr)
        if (error !== null) {
            console.log('exec error: ' + error)
        }
    })
} 
