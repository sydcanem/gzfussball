/*global describe:false, it:false, before:false, after:false */
'use strict';

var express = require( 'express' );
var app     = express();
var request = require( 'supertest' );
var expect  = require( 'chai' ).expect;

var server  = require( '../../../server' );
var matches = require( '../../../server/routes/matches');

describe( 'Matches', function () {
	var db;

	before( function ( done ) {
		server.connectMongo( {
			'db' : 'test'
		} ).done( function( conn ) {
			db = conn.db;

			app.use( express.bodyParser() );
			server.registerRoutes( app, matches );
			done();
		} );
	} );

	after( function ( done ) {
		db.dropDatabase( function ( err ) {
			done();
		} );
	} );

	describe( '/matches/create', function () {

		it( 'returns a match', function ( done ) {
			var data = {
				'challenger' : {
					'login' : 'testbar'
				},
				'opponent' : {
					'login' : 'testfoo'
				}
			};

			request( app )
				.post( '/matches/create' )
				.send( data )
				.expect( 200 )
				.expect( 'Content-Type', /json/ )
				.end( function ( err, res ) {
					if ( err ) {
						return console.log( 'error: ', err );
					}
					expect( res.body.players ).to.deep.equal( [ 'testbar', 'testfoo' ] );
					expect( res.body.initiated ).to.equal( 'testbar' );
					done();
				} );
		} );
	} );
} );
