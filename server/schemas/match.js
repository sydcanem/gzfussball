var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var Match = new Schema( {
	'started' : {
		'type' : Date,
		'default' : Date.now
	},
	'initiated' : {
		'type' : Schema.Types.ObjectId,
		'require' : true
	},
	'players' : {
		'type' : [ Schema.Types.ObjectId ]
	},
	'results' : {
		'type' : Object
	}
} );

module.exports = mongoose.model( 'match', Match );
