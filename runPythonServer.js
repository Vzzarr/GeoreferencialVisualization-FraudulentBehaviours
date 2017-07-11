/**
 * Created by blackmamba on 08/07/17.
 */

var child_process = require('child_process'),
    child;

process.on('message', function (m) {
    child = child_process.exec('cd $NANOCUBE_SRC/extra/nc_web_viewer && python -m SimpleHTTPServer 8000', function (error, stdout, stderr) {
        console.log('stdout: ' + stdout)
        console.log('stderr: ' + stderr)
        if (error !== null) {
            console.log('exec error: ' + error)
        }
    })
})