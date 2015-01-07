'use strict';

module.exports = function(app, express) {

	app.set('env', 'production');


	/*
	*
	* Middleware
	*
	*/

	var morgan = require('morgan');
	var errorHandler = require('errorhandler');
	var favicon = require('serve-favicon');


	if (app.get('env') === 'development') {
		app.use(errorHandler({ dumpExceptions: true, showStack: true }));
		app.locals.pretty = true;
		app.use(morgan('dev'));
	}
	else {
		app.use(errorHandler());
		app.use(morgan('dev'));
	}

	// all environments
	app.set('port', 9000);
	app.set('views', GLOBAL.paths.getView());
	app.set('view engine', 'jade');



	app.use(
		favicon(GLOBAL.paths.getPublic('favicon.ico'))
	);





	var staticOptions = {
		maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
	};

	app.use(express.static(GLOBAL.paths.getPublic(), staticOptions));
};

