"use strict";


var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var AuthorStore=require('../../stores/authorStore');
var AuthorAction=require('../../actions/authorAction');
var AuthorList = require('./authorList');

var Authors = React.createClass({

   getInitialState: function(){
   	return {authors: AuthorStore.getAllAuthors()};
   },

   render: function(){
		return (
<div>
<h1>
Authors!!!
</h1>
<Link to = "addAuthor" className="btn btn-default"> add author </Link>
<AuthorList authors={this.state.authors} />
</div>
);
}
});

module.exports = Authors;