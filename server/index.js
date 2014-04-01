'use strict';

var http       = require( 'http' );
var path       = require( 'path' );
var express    = require( 'express.io' );
var mongoose   = require( 'mongoose' );
var MongoStore = require( 'connect-mongo' )( express );
var promise    = require( 'bluebird' );
var traverse   = promise.promisify( require( 'glob' ) );
var app        = express();
var debug      = require( 'debug' )( 'server:index' );
// Start io server
app.http().io();

var utils       = require( './utils' );
var settings    = require( './settings' );
var middlewares = require( './middlewares' );
var routes      = path.resolve( __dirname, 'routes' );

function Server() {}

// Server initialization
Server.prototype.start = function () {
	promise.all( [
		this.connectMongo(),
		this.initMiddlewares(),
		this.initRouters()
	] ).then( function () {
		app.listen( settings.app.port, function () {
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
	app.set( 'env', process.env.NODE_ENV );
	app.set( 'port', settings.app.port );
	app.set( 'host', settings.app.host );

	
	app.set( 'views', settings.static.views );
	app.use( express.static( settings.static.files ) );

	if ( 'development' === app.get( 'env' ) ) {
		app.use( express.logger() );
	}

	app.use( express.cookieParser() );
	app.use( express.session( {
		'secret' : settings.session.secret,
		'store' : new MongoStore( {
			'db' : settings.session.db
		} )
	} ) );
	
	app.use( middlewares.passport.initialize() );
	app.use( middlewares.passport.session() );
	
	return promise.resolve();
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
