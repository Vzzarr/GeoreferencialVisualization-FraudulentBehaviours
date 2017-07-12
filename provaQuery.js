/**
 * Created by blackmamba on 09/07/17.
 */

/*var express = require('express');
 var request = require('request');
 var app = express();

 var txUrl = "http://localhost:7474/db/data/transaction/commit";

 //normal index page output
 app.get('/', function (req, res) {
 res.send('<h2>This is a demo of neo4j, a graph database</h2>');
 });


 // data get route returns the node we created
 app.get('/data', function (req, res) {
 var query="MATCH (n:VoidCanvas) RETURN n LIMIT 100";

 var promise = doDatabaseOperation(query);
 promise.then(function (data) {
 res.send(data)
 })

 });

 // data post route to create a node of type "VoidCanvas" and name attribute as "Paul"
 app.post('/data', function (req, res) {
 var query="CREATE (n:VoidCanvas {name:'Paul'}) RETURN n";

 var promise = doDatabaseOperation(query)
 promise.then(function (data) {
 res.send(data)
 })

 });


 // data get route returns the node with name=given parameter
 app.get('/data/:name', function (req, res) {
 var query="MATCH (n:VoidCanvas {name: {nameParam}}) RETURN n LIMIT 100";
 var params = {
 nameParam : req.params.name
 }

 var promise = doDatabaseOperation(query, params);
 promise.then(function (data) {
 res.send(data)
 })

 });

 // data post route to create a node of type "VoidCanvas" and name attribute as given parameter
 app.post('/data/:name', function (req, res) {
 var query="CREATE (n:VoidCanvas {name:{nameParam}}) RETURN n";

 var params = {
 nameParam : req.params.name
 }

 var promise = doDatabaseOperation(query, params);
 promise.then(function (data) {
 res.send(data)
 })

 });

 var doDatabaseOperation = function (query, params) {
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
 });
 }

 module.exports = app*/

/*var fs = require("fs")
 var csv = require("fast-csv")

 console.log(fs.createReadStream("~/Desktop/SenzaDuplicati/2same_telPrefix.csv").pipe(csv()))*/

/*var fs = require('fs'),
 path = require('path'),
 filePath = path.join(__dirname, 'data/12cyclic_sameCF.csv');
 var ciao = []

 fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
 if (!err) {
 var rows = data.split("\n")
 console.log('received data: ' + rows.length)
 for(var i=1; i<data.split("\n").length; i++){
 var row = rows[i].split(",")
 if(row[3]!='null')
 ciao.push(row[3])
 else
 ciao.push(row[2])
 }
 } else {
 console.log(err)
 }

 })


 fs.close
 */

// USAGE ------
// ============

var fs = require('fs')
var logger = fs.createWriteStream('log.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
})

logger.write('some data\n') // append string to your file
logger.write('more data\n') // again
logger.write('and more\n') // again

fs.close