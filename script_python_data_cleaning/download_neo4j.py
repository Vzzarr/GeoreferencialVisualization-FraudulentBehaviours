from neo4j.v1 import GraphDatabase, basic_auth

driver = GraphDatabase.driver("bolt://localhost:7687", auth=basic_auth("neo4j", "root"))
session = driver.session()
result = session.run("MATCH p=(:Cliente)-[:HA_REFERENTE|:HA_ID_ANAGRAFICO*3..]-() "
                     "RETURN extract (n IN nodes(p) | n.pi) AS extracted")

findcli = open('/home/nicholas/Scaricati/cicli_clienti_pi.csv', 'w')
i = 0
for record in result:
    for cf in record['extracted'] :
        if cf != None :
            findcli.write(cf + '\n')
            print (cf)
            i += 1
print (i)

findcli.close()


