var React = require( 'react' );
var Row   = require( './row' );

module.exports = React.createClass( {

	'render': function () {
		var rows = [];
		var self = this;

		this.props.users.forEach( function ( user ) {
			rows.push(<Row user={user} handleChallenge={self.props.handleChallenge} key={user.cid} />);
		} );

		return (
			<table className='table'>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
} );
