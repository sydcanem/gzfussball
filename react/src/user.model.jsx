'use strict';

var _ = require( 'underscore' );
var Backbone = require( 'backbone.iobind' );
var socket = require( './sockets' );

module.exports = Backbone.Model.extend( {
	
	'urlRoot' : 'users',

	'idAttribute' : '_id',

	'socket' : socket,

	'initialize' : function () {
		
		_.bindAll( this, 'serverUpdate' );
		
		this.listenTo( this, 'change', this.whatChanged, this );

		this.ioBind( 'update', this.serverUpdate, this );

	},

	'serverUpdate' : function ( model ) {
		this.set( 'status', 'challenged' );
	},

	'whatChanged' : function ( model ) {
		console.log( model );
	}
} );
