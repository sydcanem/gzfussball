var http     = require( 'http' );
var path     = require( 'path' );
var express  = require( 'express' );
var mongoose = require( 'mongoose' );
var promise  = require( 'bluebird' );
var traverse = promise.promisify( require( 'glob' ) );
var app      = express();

var utils  = require( './utils' );
var routes = path.resolve( __dirname, 'routes' );

function Server() {}

// Server initialization
Server.prototype.start = function () {
	promise.all( [
		this.initMiddlewares(),
		this.initRouters(),
		this.connectMongo()
	] ).then( function () {
		app.listen( 9090, function () {
			var env = app.get( 'env' );
			console.log( 'App running in ' + env + ' mode @ localhost:9090' );
		} );
	} ).catch( function ( error ) {
		console.log( error );
	} ).error( function ( error ) {
		console.log( error );
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

Server.prototype.initMiddlewares = function () {
	app.set( 'views', process.cwd() + '/public/views' );
	app.use( express.logger( 'dev' ) );
	app.use( express.static( process.cwd() + '/public' ) );
	return promise.resolve();
};

Server.prototype.connectMongo = function () {
	var db;
	var defer = promise.defer();

	mongoose.connect( utils.mongoUrl() );
	db = mongoose.connection;

	db.once( 'open', defer.resolve.bind( defer, 'Mongoose connection open' ) );
	db.once( 'error', defer.reject.bind( defer, 'Mongoose connection error.' ) );

	return defer.promise;
};

function start() {
	new Server().start();
}

module.exports = app;
module.exports.start = start;
