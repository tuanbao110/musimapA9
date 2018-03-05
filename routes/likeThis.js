
/*
 * GET likeThis
 */

var data = require('../data.json');

exports.view = function(req, res){
  res.render('likeThis', data);
};

exports.viewFromArtist = function(req, res) {
    var fromName = req.params.name;
    var fromGenre = "";
    //var likeData = JSON.parse(JSON.stringify(data));
    var likeData = {"artists": []};

    //get genre of from artist
    for(var i = 0; i < data.artists.length; i++) {
        var obj = data.artists[i];

        if(obj.name == fromName) {
            fromGenre = obj.genre;
        }
    }

    //get artists of same genre
    for(var i = 0; i < data.artists.length; i++) {
        var obj = data.artists[i];

        if(obj.genre == fromGenre) {
            console.log("Found genre match: " + obj.name);
            likeData.artists.push(obj);
        }

        //special case for prog bands
        if((fromGenre == "Progressive Metal" && obj.genre == "Progressive Death Metal")
            || (obj.genre == "Progressive Metal" && fromGenre == "Progressive Death Metal")) {
                likeData.artists.push(obj);
            }
    }
    

    //remove 'from artist' from like this data
    for(var i = 0; i < likeData.artists.length; i++) {
        var obj = likeData.artists[i];

        if(obj.name == fromName) {
            likeData.artists.splice(i, 1);
            break;
        }
    }

    res.render('likeThis', {fromName, likeData});
};
