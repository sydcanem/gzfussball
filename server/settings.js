module.exports = {
	'app_name' : 'gzonline',
	'env' : process.env.NODE_ENV || 'development',
	'port' : process.env.NODE_PORT || '9090',
	
	'session' : {
		'secret' : 'mouse trap',
		'db' : 'session'
	},

	'static' : {
		'files' : process.cwd() + '/public',
		'views' : process.cwd() + '/public/views'
	},

	'github' : {
		'oauth_endpoint' : 'https://github.com/login/oauth/access_token',
		'client_id' : process.env.GITHUB_ID || 'b38b5dbe65d07c8ce86f',
		'client_secret' : process.env.GITHUB_SECRET || '066f04ec2d8d4acc0d2c83dadfe61f0bf054f0d2'
	}
};
