var express = require( 'express' );
var settings = require( '../settings' );

module.exports = function ( app ) {
	app.set( 'views', settings.static.views );
	app.use( express.static( settings.static.files ) );
};
