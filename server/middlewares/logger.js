var express = require( 'express' );
var settings = require( '../settings' );

module.exports = function( app ) {
	if ( settings.env === 'development' ) {
		app.use( express.logger( 'dev' ) );
	}
};
