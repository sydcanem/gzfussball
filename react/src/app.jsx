'use strict';

var React  = require( 'react' );
var Table  = require( './table' );
var Header = require( './header' );

var socket = require( './sockets' );
var BackboneMixin = require( './backbone.mixin' );

module.exports = React.createClass( {

	mixins : [ BackboneMixin ],

	handleChallenge : function ( opponent ) {
		socket.emit( 'matches:create', { 'opponent' : opponent } );
	},

	componentDidMount : function () {
		socket.on( 'connect', function () {
			console.log( 'socket.io connected' );
		} );
	},

	getBackboneModels : function() {
		return [ this.props.users  ];
	},

	render : function () {
		return (
			<div className="row">
				<Header session={this.props.session}/>
				<div id="table">
				  <Table users={this.props.users} handleChallenge={this.handleChallenge} />
				</div>
			</div>
		);
	}
} );
