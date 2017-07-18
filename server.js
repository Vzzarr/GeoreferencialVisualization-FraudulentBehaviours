var express = require('express')
var app = express()
var supportMethods = require('./supportServerMethods.js')


app.use( express.static( __dirname + '/client' ))

supportMethods.runPythonServer()

app.get('/', function (req, res) {

    res.sendFile( path.join( __dirname, 'client', 'index.html' ))

})

app.get('/runServersNannocubes', function (req, res) {
    var fs = require('fs')
    if (fs.existsSync(__dirname+'/guarda')) {
        console.log('File exists')
        var rows = fs.readFileSync('guarda').toString().split('\n');
        fs.close
        console.log(rows[0])
        if(require('is-running')(parseInt(rows[0]))){
                process.kill(parseInt(rows[0]))
            }
    }
    supportMethods.runQueryServer(req.query.id)
    setTimeout(function () {
        res.send('http://localhost:8000/#'+req.query.id);
    },500)
})

app.get('/queryNeo4j', function (req, res){

    var promise = supportMethods.doDatabaseOperation(req.query.queryNeo4j);
    promise.then(function (data) {
        res.send(data)
    })
})

app.get('/getUsers', function (req, res){

    var data = req.query.data
    var nameFile = data.fileName
    var perimeter = []

    console.log(nameFile)


    for(var i = 0; i<data.perimeter.length ;i++) {
        var latElng = []
        latElng.push(parseFloat(data.perimeter[i][0]))
        latElng.push(parseFloat(data.perimeter[i][1]))
        perimeter.push(latElng)
    }

    var fs = require('fs'),
        path = require('path'),
        filePath = path.join(__dirname, 'data/'+nameFile+'.csv');

    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        var usersInsidePerimeter = []
        if (!err) {
            var rows =data.split("\n")
            console.log('received data: ' + rows.length)
            for(var i=1; i<data.split("\n").length; i++){
                var row = rows[i].split(",")
                var latElngUser = []
                latElngUser.push(row[0])
                latElngUser.push(row[1])
                if(supportMethods.inside(latElngUser, perimeter)===true){
                    if(row[3]!='null')
                        usersInsidePerimeter.push(row[3])
                    else
                        usersInsidePerimeter.push(row[2])
                }
            }
            console.log(usersInsidePerimeter.length)
            res.jsonp(usersInsidePerimeter)
        } else {
            console.log(err)
        }
    })

    fs.close
})

app.listen(3000, function () {
    console.log('App listening on port 3000!');
})