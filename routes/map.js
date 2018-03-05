
/*
 * GET map page.
 */

var data = require('../data.json'); //full set
var data2 = require('../data2.json'); //library
var data3 = require('../public/data3.json'); //map data

exports.view = function(req, res){

    //example node: {"data": {"id": "", "label": ""}}
    //example edge: {"data": {"id": "ab","source": "a", "target": "b"}}
    var newData = {"nodes": [], "edges": []};

    //make set of data not in library
    var notInLibrary = subtract(data, data2);

    //loop through all nodes
    /*for(var i = 0; i < data.artists.length; i++) {
        var inLibrary = 0;
        var obj1 = data.artists[i];
        for(var j = 0; j < data2.artists.length; j++) {
            var obj2 = data2.artists[j];
            if(obj1.name == obj2.name) {
                inLibrary = 1;
            }
        }

        //if not in library, add to node set
        if(inLibrary == 0) {
            var newNode = {"data": {"id": obj1.name, "label": obj1.name, "genre:": obj1.genre,
            "inLibrary": 'false', "href":"artistscreen/"+obj1.name}};
            //newData.nodes.push(newNode);
        }
        else {
            var newNode = {"data": {"id": obj1.name, "label": obj1.name, "genre:": obj1.genre,
            "inLibrary": 'true', "href":"artistscreen/"+obj1.name}};
            newData.nodes.push(newNode);
        }
    }*/

    //make edges
    for(var i = 0; i < data.artists.length; i++) {
        var obj1 = data.artists[i];
        for(var j = 0; j < data.artists.length; j++) {
            var obj2 = data.artists[j];

            //same genre
            if((obj1.name != obj2.name) && (obj1.genre == obj2.genre)) {
                var newEdge = {"data": {"id": obj1.name + ", " + obj2.name,
                    "source": obj1.name, "target": obj2.name}};
                newData.edges.push(newEdge);
            }

            //special case: Black Sabbath and Megadeth
            if((obj1.name == "Black Sabbath") && (obj2.name == "Megadeth")) {
                var newEdge = {"data": {"id": obj1.name + ", " + obj2.name,
                    "source": obj1.name, "target": obj2.name}};
                newData.edges.push(newEdge);
            }

            //special case: Testament and Death
            if((obj1.name == "Testament") && (obj2.name == "Death")) {
                var newEdge = {"data": {"id": obj1.name + ", " + obj2.name,
                    "source": obj1.name, "target": obj2.name}};
                newData.edges.push(newEdge);
            }

            //special case: Death and Mayhem
            if((obj1.name == "Death") && (obj2.name == "Mayhem")) {
                var newEdge = {"data": {"id": obj1.name + ", " + obj2.name,
                    "source": obj1.name, "target": obj2.name}};
                newData.edges.push(newEdge);
            }

            //special case: Death and Atheist
            if((obj1.name == "Death") && (obj2.name == "Atheist")) {
                var newEdge = {"data": {"id": obj1.name + ", " + obj2.name,
                    "source": obj1.name, "target": obj2.name}};
                newData.edges.push(newEdge);
            }

            //special case: Atheist and Blotted Science
            if((obj1.name == "Atheist") && (obj2.name == "Blotted Science")) {
                var newEdge = {"data": {"id": obj1.name + ", " + obj2.name,
                    "source": obj1.name, "target": obj2.name}};
                newData.edges.push(newEdge);
            }
        }
    }

    //add nodes in library
    for(var j = 0; j < data2.artists.length; j++) {
        var obj2 = data2.artists[j];
        var newNode = {"data": {"id": obj2.name, "label": obj2.name, "genre:": obj2.genre,
            "inLibrary": 'true', "href":"artistscreen/"+obj2.name}};
        newData.nodes.push(newNode);

        //add nodes next to new one to the map. Skip those in library
        for(var i = 0; i < data.artists.length; i++) {
            var hasEdge = false;
            var inLibrary = false;
            var obj1 = data.artists[i];

            //check if in library
            for(var k = 0; k < data2.artists.length; k++) {
                var obj3 = data2.artists[k];
                if(obj1.name == obj3.name) {
                    inLibrary = true;
                }
            }

            //only do this if not already in library
            if(inLibrary == false) {
                //see if there's an edge between potential node and current
                for(var e = 0; e < newData.edges.length; e++) {
                    var edge = newData.edges[e].data;
                    if((obj2.name == edge.source && obj1.name == edge.target)
                    || (obj1.name == edge.source && obj2.name == edge.target)) {
                        var newNode1 = {"data": {"id": obj1.name, "label": obj1.name, "genre:": obj1.genre,
            "inLibrary": 'false', "href":"artistscreen/"+obj1.name}};
                        newData.nodes.push(newNode1);
                    }
                }
            }
        }
    }

    const fs= require('fs');
    const content = JSON.stringify(newData);

    //write new JSON data file so map can use it
    fs.writeFile("public/data3.json", content, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 

    res.render('map');
};

var subtract = function(a, b){
    var r = {};
    for(var i in a){
        var ai = a[i];
        for(var j in b){
            var bj = b[j];
            if(ai.name != bj.name || ai.age != bj.age){
                r[i] = ai;
            }
        }
    }
    return r;
};
