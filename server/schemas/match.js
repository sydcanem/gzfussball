var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var Match = new Schema( {
	'started' : {
		'type' : Date,
		'default' : Date.now
	},
	'initiated' : {
		'type' : String,
		'require' : true
	},
	'players' : {
		'type' : [ String ]
	},
	'results' : {
		'type' : Object
	}
} );

module.exports = mongoose.model( 'match', Match );
