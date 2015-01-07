/*
 *
 *	GLOBAL path helpers
 *
 */

GLOBAL.paths = require('./config/paths');


/*
 *
 * Express
 *
 */
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var express = require('express');
var app = express();


/*
 *
 * Configuration
 *
 */

require(GLOBAL.paths.getConfig('express'))(app, express);
console.log('App Environment', app.get('env'));


/*
 *
 * Routes
 *
 */

require(GLOBAL.paths.getRoute())(app, express);


/*
 *
 * Server
 *
 */


if (cluster.isMaster) {
    console.log('[master] ' + "start master...");

    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('listening', function (worker, address) {
        console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
    });

} else if (cluster.isWorker) {
    console.log('[worker] ' + "start worker ..." + cluster.worker.id);
    app.listen(app.get('port'), function () {
        console.log('worker' + cluster.worker.id);
        console.log(Date.now(), 'Express server listening on port ' + app.get('port'));
    });
}

