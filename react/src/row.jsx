'use strict';

var React = require( 'react' );

module.exports = React.createClass( {

	'handleClick' : function () {
		this.props.handleChallenge( this.props.user );
	},

	'render' : function () {
		return (
			<tr>
				<td>
				  {this.props.user.get( 'name' )}
				  <small className="goals">{this.props.user.get( 'goals' ) + ' goals'}</small>
				</td>
				<td className="status">
				  <small
				  onClick={this.handleClick}>
				  {this.props.user.get( 'status' )}</small>
			  </td>
			</tr>
		);
	}
} );
