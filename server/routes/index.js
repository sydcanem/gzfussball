'use strict';

var utils = require( '../utils' );

var User = require( '../schemas/user' );

module.exports = [
	{
		'method' : 'get',
		'path' : '/',
		'fn' : function ( request, response ) {
			User.find()
				.lean()
				.sort( {
					'rank': 1
				} )
				.exec( function ( error, users ) {
					if ( error ) {
						return response.send( 500, error );
					}

					var def = {
						'users' : utils.stringify( users ),
						'session' : utils.stringify( request.session.passport.user || '' )
					};

					response.render( 'index', def );
				} );
		}
	}
];
