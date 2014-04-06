'use strict';

var path  = require( 'path' );
var doT   = require( 'dot' );
var utils = require( '../utils' );

var User = require( '../schemas/user' );

module.exports = function ( app ) {
	var views = app.get( 'views' );

	var routes = [
		{
			'method' : 'get',
			'path' : '/',
			'fn' : function ( request, response ) {
				var view = utils.load( path.join( views, '/index.html' ) );

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

						var pagefn = doT.template( view, undefined, def );
						response.send( pagefn() );
					} );
			}
		}
	];

	routes.forEach( function ( route ) {
		app[ route.method ]( route.path, route.fn );
	} );
};
