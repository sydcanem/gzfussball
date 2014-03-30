var promise  = require( 'bluebird' );
var request  = promise.promisify( require( 'request' ) );
var debug    = require( 'debug' )( 'route:github' );
var settings = require( '../settings' );

var User = require( '../schemas/user' );

module.exports = function ( app ) {
	
	var routes = [
		{
			'method' : 'get',
			'path' : '/auth/github',
			'fn' : function( req, res ) {
				var auth, authentication;
				var userInfo;

				auth = {
					'url' : settings.github.oauth_endpoint,
					'method' : 'post',
					'json' : true,
					'body' : {
						'client_id' : settings.github.client_id,
						'client_secret' : settings.github.client_secret,
						'code' : req.query.code
					}
				};
				
				userInfo = {
					'url' : 'https://api.github.com/user',
					'method' : 'get',
					'json' : true,
					'headers' : {
						'User-Agent' : settings.app_name
					}
				};

				authentication = request( auth )
					.then( function( response ) {
						userInfo.qs = { 'access_token' : response[0].body.access_token };
					} );
				
				authentication.done( function ( response ) {
					request( userInfo )
						.then( function ( user ) {
							
							user =  user[0].body;

							// Find user or create if not found
							User.findOneAndUpdate( {
								'github.id' : user.id
							}, {
								'name'   : user.name,
								'login'  : user.login,
								'github' : user,
								'rank'   : 0,
								'goals'  : 0,
								'status' : 'idle'
							}, {
								'upsert' : true,
								'new'    : true
							}, function ( error, doc ) {
								if ( error ) {
									debug( error );
									return res.send( 500, 'Something went wrong' );
								}
								
								debug( 'Github authentication successful' );
								req.session.user = doc;
								res.redirect( '/' );
							} );

						} );
				}, function ( error ) {
					debug( error );
				} );
			}
		},
		{
			'method' : 'get',
			'path' : '/auth/github/signout',
			'fn' : function ( req, res ) {
				if ( req.session.user ) {
					delete req.session.user;
				}

				res.redirect( '/' );
			}
		}
	];

	routes.forEach( function ( route ) {
		app[ route.method ]( route.path, route.fn );
	} );
};
