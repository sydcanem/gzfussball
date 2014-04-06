'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var dot = require( 'dot' );

// view cache
var cache = {};
var read = fs.readFileSync;

function load( file, options ) {
	var opts = options || {};
	var view;

	file = path.resolve( file );
	if ( cache[ file ] ) {
		return cache[ file ];
	}

	view = read( file, 'utf8' );

	if ( opts.cache ) {
		cache[ file ] = view;
	}

	return view;
}

function generateMongoUrl( options ) {
	options = options || {};

	var host = options.host || 'localhost';
	var port = options.port || '27017';
	var db = options.db || 'dev';
	var url = '';

	if ( options.user && options.pass ) {
		url = 'mongodb://' + options.user + ':' + options.pass + '@' + host + ':' + port + '/' + db;
	} else {
		url = 'mongodb://' + host + ':' + port + '/' + db;
	}

	return url;
}

function safeStringify( unsafe ) {
	return JSON.stringify( unsafe )
		.replace( /<\/script/g, '<\\/script' )
		.replace( /<!--/g, '<\\!--' );
}

function merge( a, b ) {
  if ( a && b ) {
    for ( var key in b ) {
      a[ key]  = b[ key ];
    }
  }
  return a;
}

function renderFile( path, options, fn ) {
	var pagefn;
	var def = merge( options, { '_load' : load } );

	try {
		pagefn = dot.template( load( path, options ), undefined, def );
	} catch ( error ) {
		fn( error );
	}

	fn( null, pagefn( options ) );
}

// Expose methods and vars
exports.load = load;
exports.cache = cache;
exports.merge = merge;
exports.mongoUrl = generateMongoUrl;
exports.stringify = safeStringify;
exports.renderFile = renderFile;