var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var Match = new Schema( {
	'started' : {
		'type' : Date,
		'default' : Date.now
	},
	'initiated' : {
		'type' : mongoose.ObjectId,
		'require' : true
	},
	'players' : {
		'type' : [ mongoose.ObjectId ]
	},
	'results' : {
		'type' : Object
	}
} );

module.exports = mongoose.model( 'match', Match );
