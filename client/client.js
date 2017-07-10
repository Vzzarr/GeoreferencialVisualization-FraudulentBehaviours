function selectQuery(s) {
    var value = s[s.selectedIndex].value
    var id = s[s.selectedIndex].id
    document.getElementById("description").innerHTML = "Descrizione: " + value;
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("Visualizza nella mappa")
    btn.appendChild(t)
    btn.addEventListener("click", function(){
        callRunServersNanocubes(id);
    }, false)
    document.getElementById("description").appendChild(btn);
}

function callRunServersNanocubes(idQuery) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/runServersNannocubes',
        data: {id:idQuery},
        success: function (data) {
            window.location.replace(data);
            console.log(data)
        }
    });
}

function callFunctionQuery(e) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/queryNeo4j',
        data: {queryNeo4j:e},
        success: function (data) {
            //createAGraph(data)
            console.log(data)
        }
    })
}
