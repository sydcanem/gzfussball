var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var Notification = new Schema( {
	'message' : {
		'type' : String,
		'required' : true
	},
	'user' : {
		'type' : String,
		'required' : true
	},
	'sent' : {
		'type': Date
	},
	'received' : {
		'type' : Date
	},
	'status' : {
		'type' : String,
		'default' : 'unconfirmed' // confirmed or unconfirmed
	}
} );

module.exports = mongoose.model( 'notification', Notification );
