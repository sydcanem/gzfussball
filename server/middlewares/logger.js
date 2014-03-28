var express = require( 'express' );
var settings = require( '../settings' );

module.exports = function( app ) {
	app.use( express.logger( settings.env ) );
};
