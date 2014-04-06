'use strict';

var debug    = require( 'debug' )( 'route:github' );
var settings = require( '../settings' );
var passport = require( '../middlewares' ).passport;

module.exports = function ( app ) {
	
	var routes = [
		{
			'method' : 'get',
			'path' : '/auth/github',
			'fn' : [
				passport.authenticate( 'github' ),
				function( request, response ) {
					// The request will be redirected to Github for authentication, so this
					// function will not be called.
				}
			]
		},
		{
			'method' : 'get',
			'path' : '/auth/github/callback',
			'fn' : [
				passport.authenticate( 'github', { 'failureRedirect' : '/' } ),
				function( request, response ) {
					response.redirect( '/' );
				}
			]
		},
		{
			'method' : 'get',
			'path' : '/auth/github/signout',
			'fn' : [
				passport.ensureAuthenticated,
				function ( request, response ) {
					response.redirect( '/' );
				}
			]
		}
	];

	routes.forEach( function ( route ) {
		app[ route.method ]( route.path, route.fn );
	} );
};
