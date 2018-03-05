
/*
 * GET results
 */

var data = require('../data.json');

exports.view = function(req, res){

    var search = (req.query.searchName).toLowerCase();
    console.log("searched for: " + search);

    var resultData = {"artists": []};

    //loop through data to find searched artist
    for(var i = 0; i < data.artists.length; i++) {
        var obj = data.artists[i];
        var nameResult = ((obj.name).toLowerCase()).search(search);
        var genreResult = ((obj.genre).toLowerCase()).search(search);

        console.log("checking: " + obj.name);
        console.log("nameResult: " + nameResult);
        console.log("genreResult: " + genreResult);

        if((nameResult != -1) || (genreResult != -1)) {
            resultData.artists.push(obj);
        }
    }

    console.log(resultData.artists);

    res.render('results', resultData);
};
