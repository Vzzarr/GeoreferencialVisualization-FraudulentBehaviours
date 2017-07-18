function callRunServersNanocubes(idQuery) {

    console.log(idQuery.id)

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/runServersNanocubes',
        data: {id:idQuery.id},
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
