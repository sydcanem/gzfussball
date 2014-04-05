'use strict';

var debug = require( 'debug' )( 'route:matches' );
var passport = require( '../middlewares' ).passport;

var Match = require( '../schemas/match' );
var Notification = require( '../schemas/notification' );

module.exports = function matches ( app ) {

	var routes = [
		{
			'method' : 'post',
			'path' : '/matches/create',
			'fn' : [
				passport.ensureAuthenticated,
				function ( request, response ) {

					Match.create( {
						'initiated' : request.session.passport.user.login,
						'players' : [
							request.session.passport.user.login,
							request.data.opponent.login
						]
					}, function( error, match ) {
						
						if ( error ) {
							debug( error );
							return res.send( 500, 'Something went wrong.' );
						}

						res.send( 200, match );
					} );
				}
			]
		}
	];

	routes.forEach( function ( route ) {
		app[ route.method ]( route.path, route.fn );
	} );
};
