# GeoreferencialVisualization-FraudulentBehaviours
Questo progetto ha l'obiettivo di introdurre la possibilità di poter interagire con gli utenti visualizzati sulla mappa geografica di Nanocubes, funzionalità che non viene offerta nativamente.

## Configurazione Iniziale
Per eseguire questo progetto sarà necessario scaricare questa repository GitHub su un sistema operativo Linux.
Le dipendenze per permettere al sistema di avviarsi sono le librerie Node di JavaScript e Boost di C++, scaricabili nei sistemi Debian tramite i comandi 
```sh
sudo apt-get install nodejs-legacy
sudo apt-get install libboost-all-dev
``` 
Andrà modificato il file $NEO4J_SRC/conf/neo4j.conf mettendo il file neo4j.conf riportato all'interno di questa repository.
Quindi andrà avviato il proprio DB di Neo4j tramite
```sh
cd $NEO4J_SRC/bin && ./neo4j console
``` 
Dovrà poi essere modificato il file "supportServerMethods.js" cambiando le variabili "password" e "Basic", adattandole alle credenziali di accesso al proprio DB Neo4j. In particolare la variabile Basic può essere ottenuta a partire dalla propria password tramite il comando
```sh
echo -n neo4j:password | base64
```
In seguito con un terminale, posizionandosi nella root del progetto, bisognerà eseguire il comando 
```sh
node server.js
```
Infine con il proprio browser si raggiungerà l’indirizzo [localhost:3000](https://localhost:3000): si è pronti ad interagire col sistema.

## Calcolo Clienti presenti all'interno del Poligono Disegnato
Il retrieve dei clienti all'interno di un poligono, viene fatto nel momento in cui viene disegnato il poligono. In particolare all'interno del file nanocube-3.2.1/extra/nc_web_viewer/Model.js, nella funzione Model.prototype.drawCreated la variabile coords contiene le coordinate geografiche dei vertici del poligono appena disegnato (più il primo vertice ripetuto, pertanto all'interno della variabile poly ci siamo salvati i valori di coords tranne l'ultimo).
A partire da questo viene richiamata la funzione getUsers() con parametro poly, che si occupa di fare una richiesta al nostro server.js scritto in Node; questo si occupa di fare il parsing del file .csv relativo alla visualizzazione dei dati correnti. Durante il parsing, tramite la funzione inside() presente in supportServerMethods.js controlla se l'utente in analisi si trova all'interno del poligono appena disegnato.
Il risultato viene poi inviato al WebServer di Nanocubes, in particolare alla funzione getUsers() che ha fatto la richiesta iniziale.

Inoltre se si vuole ottenere le coordinate del punto in cui si clicca sulla mappa, all'interno della funzione Model.prototype.createMap abbiamo inserito un "Event Handler On Click: getLatLng" che posiziona un marker sulla mappa geografica in corrispondenza delle coordinate di Latitudine e Longitudine in cui si è cliccato (all'interno di questo progetto è stato commentato, ma se necessario per progetti futuri basterà decommentarlo)
```javascript
map.on('click', function(e){
    var marker = new L.Marker(e.latlng);
    marker.bindPopup("<strong>" + e.latlng + "</strong>").addTo(map);
});
```
## Gestione Contestuale delle query a Neo4j a partire dal Menu Laterale a destra
Per la creazione del menu laterale a destra viene fatta una richiesta direttamente dal metodo getUsers() (di cui si parlava nel paragrafo precedente) il quale fa la richiesta direttamente al server il quale parsa il file .csv (come spiegato precedentemente) e ottenuti gli utenti che risiedono all'interno del poligono disegnato, richiama la funzione openRightMenu() con parametro gli utenti appena recuperati. Questi verranno quindi visualizzati all'interno di un menu contestuale sulla parte destra della mappa.

## Visualizzazione del Grafo di Risposta da Neo4j
Dalla lista di utenti mostrata nel menu laterale, è possibile selezionare diversi utenti che verranno passati come parametro ad un'ulteriore richiesta che verrà fatta al nostro server node, il quale si occuperà di interrogare il DB di Neo4j: in particolare ci facciamo restituire tutti i nodi adiacenti a ciascun utente, attraverso questa query:
```
MATCH (c:Cliente)-[]-(e) WHERE c.cf ='clienteCF' RETURN  labels(e), c.cf, ID(e)
```
Il risultato di questa query a Neo4j verrà restituita al WebServer di Nanocubes dal server Node; ottenuti i risultati, il WebServer si occuperà di visualizzarli all'interno del Leaflet Popup, tramite la libreria [vis.js](http://visjs.org/).
Questo risultato verrà mostrato sotto forma di grafo, in modo da poter osservare anche se ci sono delle ulteriori relazioni tra i diversi utenti, ottenendo un risultato analogo a quello riportato nell'immagine sottostante
![alt text](https://github.com/Vzzarr/GeoreferencialVisualization-FraudulentBehaviours/blob/master/client/images/graph.png)
