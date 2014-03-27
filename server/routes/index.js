var path  = require( 'path' );
var doT   = require( 'dot' );
var utils = require( '../utils' );

module.exports = function ( app ) {
	var views = app.get( 'views' );

	var routes = [
		{
			'method': 'get',
			'path': '/',
			'fn': function ( req, res ) {
				var view = utils.load( path.join( views, '/index.html' ) );
				pagefn = doT.template( view );
				res.send( pagefn() );
			}
		}
	];

	routes.forEach( function ( route ) {
		app[ route.method ]( route.path, route.fn );
	} );
};
