'use strict';

var Match = require( '../schemas/match.js' );

module.exports = function( app ) {
	
	app.io.route( 'matches', {
		'create' : function ( req ) {
			req.io.emit( 'users/' + req.data.opponent._id + ':update', req.data.opponent );
		}
	} );

};
