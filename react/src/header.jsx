var React = require( 'react' );

module.exports	= React.createClass( {
	
	'render' : function() {
		return (
			<header>
				{ !this.props.session ? 
					<a 
						href="https://github.com/login/oauth/authorize?scope=user:email&amp;client_id=b38b5dbe65d07c8ce86f" 
						className="github-signin">Login with Github</a> :
					<a href="/auth/github/signout">Sign out</a> 
				}
			</header>
		);
	}
} );
