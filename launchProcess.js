/**
 * Created by blackmamba on 07/07/17.
 */

var child_process = require('child_process');
var localHostQuery =  child_process.fork('./runShellFile.js')
var localHostPython = child_process.fork('./runPythonServer.js')

module.exports = {
    avviaServerQuery: function(mes){
        localHostQuery.on('message', function(m) {
            // Receive results from localHostQuery process
            console.log('received: ' + m);
        })

        localHostQuery.send(mes)
    },
    avviaServerPython: function(){
        localHostPython.on('message', function(m) {
            // Receive results from localHostQuery process
            console.log('received: '+m);
        })

        localHostPython.send('ciao')
    }
}

