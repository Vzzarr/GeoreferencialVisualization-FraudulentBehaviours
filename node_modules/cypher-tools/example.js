var tools = require("cypher-tools");

var labels = ["Movie", "Horror"];

var object = {
  labels: labels,
  flagIt: false,
  title: "The One"
}

console.log(tools.objToString(object));
console.log(tools.objToParams("object", object));
console.log(tools.labelsToString(labels));
