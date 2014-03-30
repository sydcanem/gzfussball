var http     = require( 'http' );
var path     = require( 'path' );
var express  = require( 'express.io' );
var mongoose = require( 'mongoose' );
var promise  = require( 'bluebird' );
var traverse = promise.promisify( require( 'glob' ) );
var app      = express();
var debug    = require( 'debug' )( 'server:index' );
// Start io server
app.http().io();

var utils       = require( './utils' );
var settings    = require( './settings' );
var routes      = path.resolve( __dirname, 'routes' );
var middlewares = path.resolve( __dirname, 'middlewares' );

function Server() {}

// Server initialization
Server.prototype.start = function () {
	promise.all( [
		this.initMiddlewares(),
		this.initRouters(),
		this.connectMongo()
	] ).then( function () {
		app.listen( settings.port, function () {
			var env = app.get( 'env' );
			console.log( 'App running in ' + env + ' mode @ localhost:9090' );
		} );
	} ).catch( function ( error ) {
		debug( error );
	} ).error( function ( error ) {
		debug( error );
	} );
};

// Register route handlers
Server.prototype.initRouters = function () {
	return traverse( routes + '/*.js', {
		'sync': true
	} ).then( function ( routers ) {
		routers.forEach( function ( router ) {
			require( router )( app );
		} );
	} );
};

// Initialize middlewares
Server.prototype.initMiddlewares = function () {
	return traverse( middlewares + '/*.js', {
		'sync' : true
	} ).then( function( setups ) {
		setups.forEach( function ( setup ) {
			require( setup )( app );
		} );
	} );
};

Server.prototype.connectMongo = function () {
	var db;
	var defer = promise.defer();

	mongoose.connect( utils.mongoUrl() );
	db = mongoose.connection;

	db.once( 'open', function () {
		console.log( 'Mongoose connection open.' );
		defer.resolve();
	} );

	db.once( 'error', defer.reject.bind( defer, 'Mongoose connection error.' ) );

	return defer.promise;
};

function start() {
	new Server().start();
}

module.exports = app;
module.exports.start = start;
