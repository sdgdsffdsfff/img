"use strict";

var img = require(GLOBAL.paths.getService('img'));


function isInt(n) {
    return (typeof n === 'number' && n % 1 == 0);
}


module.exports = function (req, res) {
    var width = (req.params.width) ? parseInt(req.params.width) : undefined;
    var height = (req.params.height) ? parseInt(req.params.height) : width;
    var bg = (req.params.bg) ? req.params.bg : 'ccc';
    var fc = (req.params.fc) ? req.params.fc : '008600';


    if (!isInt(width) || !isInt(height)) {
        res.status(404);
        res.send('<h1>Not Found</h1>');
    }
    else {

        if (width > 2000 || height > 2000) {
            res.status(404);
            res.end('<h1>图片设置太大</h1>');
            return;
        }

        img(width, height, bg, fc, function (err, svgString) {
            var cacheTime = 60 * 60 * 24 * 7; // 7 Days
            var expires = new Date(Date.now() + (cacheTime * 1000)).toUTCString();

            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=' + (cacheTime),
                'Expires': expires
            });

            res.end(svgString);


        });
    }
};
