/**
 * Created by nicholas on 21/06/17.
 */
var express = require('express');
var app = express();
var apoc = require('apoc')

var geocoder = require('google-geocoder');
var fs = require('fs');

var geo = geocoder({
    key: 'AIzaSyAFu39xnKbHzitIoTyviJ5negJITHiuLek'
});

var apoc = require('apoc')
var query = apoc.query('MATCH (c)-[:HA_RESIDENZA_O_SEDE_IN]->(m) RETURN m.via, m.comune, m.cap, c.cf limit 120')

//var streets = []
console.log(query.statements) // array of statements in this query
query.exec().then(function(result) {
    text = '';
    for (i = 0; i < result[0]['data'].length; i++) {
        //address.push(result[0]['data'][i]['row'])

        street = result[0]['data'][i]['row'][0].split(',')
        if(street[1].match('[a-zA-Z]+').length==0)
            queryStreet = result[0]['data'][i]['row'][1] + ', ' + result[0]['data'][i]['row'][2] + ', IT'
        else
            queryStreet = street[1] + ' ' + street[0] + ', ' + result[0]['data'][i]['row'][1] + ', ' + result[0]['data'][i]['row'][2] + ', IT'
        utente = result[0]['data'][i]['row'][3]

        if (i % 10 == 0) {
            setTimeout(function() {
                console.log('wait')
            }, 1000)
        }

        createAfile(queryStreet)
    }
    //console.log(text)
}, function(fail) {
    console.log(fail)
})

function createAfile(queryStreet) {
    console.log(queryStreet)
    geo.find(queryStreet, function(err, res) {

        fs.appendFile("/Users/blackmamba/Desktop/fraudDetection.csv", res[0].location.lat + ',' + res[0].location.lng + ',' + utente + '\n', function(err) {
            if (err) {
                return console.log(err);
            }
        });
    })
}