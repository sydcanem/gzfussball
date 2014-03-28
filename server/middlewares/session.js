var express = require( 'express' );
var MongoStore = require( 'connect-mongo' )( express );

var settings = require( '../settings' );

module.exports = function ( app ) {
	app.use( express.cookieParser() );
	app.use( express.session( {
		'secret' : settings.session.secret,
		'store' : new MongoStore( {
			'db' : settings.session.db
		} )
	} ) );
};
