/**
 * Created by nicholas on 21/06/17.
 */
var express = require('express');
var app = express();
var apoc = require('apoc')

var address = '';

var apoc = require('apoc')
var query = apoc.query('MATCH ()-[:HA_RESIDENZA_O_SEDE_IN]->(m) RETURN m.comune, m.via LIMIT 1')
console.log(query.statements) // array of statements in this query
query.exec().then(function (result) {
    text = '';
    for (i = 0; i < result[0]['data'].length; i++) {
        text += (result[0]['data'][i]['row'] + '\n');
    }
    address = text;
    console.log(text)
}, function (fail) {
    console.log(fail)
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});