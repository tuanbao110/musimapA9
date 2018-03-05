
/*
 * GET library
 */

var data = require('../data.json');
var data2 = require('../data2.json');

exports.view = function(req, res){
    res.render('library', data2);
};

exports.addArtist = function(req, res) {
    var addedName = req.params.name;

    console.log("Adding artist: " + addedName);

    if(addedName != null) {
        var inLibrary = 0;

        //check if already in library
        for(var i = 0; i < data2.artists.length; i++) {
            var obj = data2.artists[i];

            if(obj.name == addedName) {
                inLibrary = 1;

                //remove if already in library
                data2.artists.splice(i, 1);
            }
        }

        if(inLibrary == 0) {

            var newArtist;

            //look for values in data
            for(var i = 0; i < data.artists.length; i++) {
                var obj = data.artists[i];

                if(obj.name == addedName) {
                    newArtist = obj;
                }


            }
            data2.artists.push(newArtist);
        }
    }

    res.render('add', data2);
};

exports.addAlt = function(req, res) {
    var addedName = req.params.name;

    console.log("Adding artist: " + addedName);

    if(addedName != null) {
        var inLibrary = 0;

        //check if already in library
        for(var i = 0; i < data2.artists.length; i++) {
            var obj = data2.artists[i];

            if(obj.name == addedName) {
                inLibrary = 1;

                //remove if already in library
                data2.artists.splice(i, 1);
            }
        }

        if(inLibrary == 0) {

            var newArtist;

            //look for values in data
            for(var i = 0; i < data.artists.length; i++) {
                var obj = data.artists[i];

                if(obj.name == addedName) {
                    newArtist = obj;
                }


            }
            data2.artists.push(newArtist);
        }
    }

    res.render('addAlt', data2);
};
