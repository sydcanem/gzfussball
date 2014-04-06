'use strict';

var Match = require( '../schemas/match.js' );

module.exports = [
	{
		'path' : 'matches',
		'io' : true,
		'events' : {
			'create' : function( request ) {
				request.io.emit( 'users/' + request.data.opponent._id + ':update', request.data.opponent );
			}
		}
	}
];
