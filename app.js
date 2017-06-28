/**
 * Created by nicholas on 21/06/17.
 */
var express = require('express');
var app = express();
var apoc = require('apoc')

var geocoder = require('google-geocoder');

var geo = geocoder({
    key: 'AIzaSyAFu39xnKbHzitIoTyviJ5negJITHiuLek'
});

var apoc = require('apoc')
var query = apoc.query('MATCH (c:Cliente)-[:HA_RESIDENZA_O_SEDE_IN]->(m:Indirizzo) WHERE m.comune IS NOT NULL AND c.cf IS NOT NULL  RETURN  m.via, m.comune, m.cap, c.cf limit 5')
var nRow = ''


query.exec().then(function(result) {
    console.log('DENTRO', result[0].data.length)
    var fs = require('fs');
    var queryStreet = ''
    var nRow = ''
    for (i=0 ; i < result[0].data.length; i++) {
        var street = result[0]['data'][i]['row'][0].split(',')
        if(street[0].match(/[a-zA-Z]+/g) != null)
            queryStreet = result[0]['data'][i]['row'][0]+ ', ' + result[0]['data'][i]['row'][1] + ', ' + result[0]['data'][i]['row'][2] + ', IT'
                //+result[0]['data'][i]['row'][3]+'\n'
        else
            queryStreet = result[0]['data'][i]['row'][1] + ', ' + result[0]['data'][i]['row'][2] + ', IT'
                //+result[0]['data'][i]['row'][3]+'\n'


        geo.find(queryStreet, nRow, function (err, res) {
                new setValues(res[0].location.lat + ',' + res[0].location.lng+'\n')
        })

    }

    var setValues =  function (value) {
        console.log(value)
        nRow = value
    }

    console.log('PROOVA', nRow)
    fs.appendFile("/Users/blackmamba/Desktop/fraudDetection.txt", queryStreet, function(err) {
        if (err) {
            return console.log(err);
        }
    });

}, function(fail) {
    console.log(fail)
})

/*console.log(queryStreet)
geo.find(queryStreet, function(err, res) {
    fs.appendFile("/Users/blackmamba/Desktop/fraudDetection.txt", res.length+'  '+utente+'\n', function(err) {
        if (err) {
            return console.log(err);
        }
    });
})*/