module.exports = {
	'env' : process.env.NODE_ENV || 'development',

	'session' : {
		'secret' : 'mouse trap',
		'db' : 'session'
	},

	'static' : {
		'files' : process.cwd() + '/public',
		'views' : process.cwd() + '/public/views'
	},

	'github' : {
		
	}
};
