var utils = require( '../utils' );
var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var User = new Schema( {
	'name' : {
		'type' : String
	},
	'login' : {
		'type' : String
	},
	'avatar' : {
		'type' : String
	},
	'rank' : {
		'type' : Number,
		'default' : 0
	},
	'goals' : {
		'type' : Number,
		'default' : 0
	},
	'status' : {
		'type' : String,
		'default' : 'idle'					// idle, playing, challenged
	}
} );

module.exports = mongoose.model( 'user', User );
