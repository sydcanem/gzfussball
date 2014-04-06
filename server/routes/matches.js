'use strict';

var debug = require( 'debug' )( 'route:matches' );

var Match = require( '../schemas/match' );
var Notification = require( '../schemas/notification' );

module.exports = [
	{
		'method' : 'post',
		'path' : '/matches/create',
		'authenticate' : true,
		'fn' : [
			function ( request, response ) {
				Match.create( {
					'initiated' : request.body.challenger.login,
					'players' : [
						request.body.challenger.login,
						request.body.opponent.login
					]
				}, function( error, match ) {

					if ( error ) {
						debug( error );
						return response.send( 500, 'Something went wrong.' );
					}

					response.send( 200, match );
				} );
			}
		]
	}
];
