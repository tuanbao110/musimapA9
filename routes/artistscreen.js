
/*
 * GET artistscreen
 */

var data = require('../data.json');
var data2 = require('../data2.json');

exports.view = function(req, res){
    res.render('artistscreen', {});
};

exports.viewName = function(req, res){
    var name = req.params.name;
    var inLibrary = false;
    
    var artist;
    for(var i = 0; i < data.artists.length; i++) {
        var obj = data.artists[i];

        if(obj.name == name) {
            artist = JSON.parse(JSON.stringify(obj));
        }
    }

    //check if in library
    for(var j = 0; j < data2.artists.length; j++) {
        var obj2 = data2.artists[j];
        if(obj2.name == name) {
            inLibrary = true;
        }
    }

    artist['inLibrary'] = inLibrary;

    res.render('artistscreen', artist);
};
