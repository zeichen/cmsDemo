"use strict";


var React = require('react');

var Input = require('../common/textInput');


var AuthorForm = React.createClass({

render:function(){
	return (
<form>
<h1>Manage Author</h1>
<Input 
	name="firstName"
	label ="FirstName"
	value={this.props.author.firstName}
	onChange={this.props.onChange} />

<Input 
	name="lastName"
	label ="LastName"
	value={this.props.author.lastName}
	onChange={this.props.onChange} />

<input type="submit" value="Save" onClick={this.props.onSave} className="btn btn-default" />

</form>


		);
}

});

module.exports = AuthorForm;

  