var path  = require( 'path' );
var doT   = require( 'dot' );
var utils = require( '../utils' );

var User = require( '../schemas/user' );

module.exports = function ( app ) {
	var views = app.get( 'views' );

	var routes = [
		{
			'method': 'get',
			'path': '/',
			'fn': function ( req, res ) {
				var view = utils.load( path.join( views, '/index.html' ) );

				User.find()
					.lean()
					.sort( {
						'rank': 1
					} )
					.exec( function ( error, users ) {
						if ( error ) {
							res.send( 500, error );
						}

						var def = {
							'users' : utils.stringify( users ),
							'session' : utils.stringify( req.session.user || '' )
						};

						var pagefn = doT.template( view, undefined, def );
						res.send( pagefn() );
					} );
			}
		}
	];

	routes.forEach( function ( route ) {
		app[ route.method ]( route.path, route.fn );
	} );
};
