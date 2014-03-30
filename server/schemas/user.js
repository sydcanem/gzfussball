var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var User = new Schema( {
	'name' : {
		'type' : String,
		'required' : true
	},
	'login' : {
		'type' : String,
		'require' : true
	},
	'github' : {
		'type' : Object,
		'required' : true
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
