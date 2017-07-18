from neo4j.v1 import GraphDatabase, basic_auth
import googlemaps
import re

driver = GraphDatabase.driver("bolt://localhost:7687", auth=basic_auth("neo4j", "root"))
session = driver.session()
result = session.run('MATCH (c:Cliente)-[:HA_RESIDENZA_O_SEDE_IN]->(m:Indirizzo) '
                     'WHERE c.cf IS NULL '
                     'RETURN m.via, m.comune, m.cap, c.pi')

gmaps = googlemaps.Client(key='api_key_google_maps')

# Geocoding an address
fileCsvStr = ''
i = 0
for record in result:
    #if 22500 <= i < 25000 and i != 22583 :
    print (i)
    street = record["m.via"].split(',')[0]
    print (record)
    if record["m.cap"] != None :
        if re.match('[a-zA-Z]+', street) != None:
            queryStreet = record["m.via"] + ', ' + record["m.comune"] + ', ' + record["m.cap"] + ', it'
        else:
            queryStreet = record["m.comune"] + ', ' + record["m.cap"] + ', it'
    else:
        if re.match('[a-zA-Z]+', street) != None:
            queryStreet = record["m.via"] + ', ' + record["m.comune"] + ', it'
        else:
            queryStreet = record["m.comune"] + ', it'
    print (queryStreet)


    resultQuery = gmaps.geocode(queryStreet)
    if len(resultQuery) > 0:
        lat = resultQuery[0]['geometry']['location']['lat']
        lng = resultQuery[0]['geometry']['location']['lng']
        print (str(lat) + ',' + str(lng) + ',' + record["c.pi"])
        fileCsvStr += str(lat) + ',' + str(lng) + ',' + record["c.pi"] + '\n'

    i += 1
    #print (i)

file = open('pi.csv', 'w')
file.write(fileCsvStr)
file.close()
session.close()