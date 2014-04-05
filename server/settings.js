module.exports = {
	'app' : {
		'port' : process.env.NODE_PORT || '9090',
		'host' : 'localhost'
	},

	'env' : process.env.NODE_ENV || 'development',
	
	'session' : {
		'secret' : 'mouse trap',
		'db'     : 'dev'
	},

	'static' : {
		'files' : process.cwd() + '/public',
		'views' : process.cwd() + '/public/views'
	},

	'github' : {
		'oauthEndpoint' : 'https://github.com/login/oauth/access_token',
		'clientID'      : process.env.GITHUB_ID || 'b38b5dbe65d07c8ce86f',
		'clientSecret'  : process.env.GITHUB_SECRET || '066f04ec2d8d4acc0d2c83dadfe61f0bf054f0d2',
		'callbackURL'   : 'http://localhost:9090/auth/github/callback'
	}
};
