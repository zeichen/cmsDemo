"use strict";

var React = require('react');
var Router = require ('react-router');
var Link =Router.Link;

var Header =React.createClass({

	render:function(){
		return(
<nav className="navbar navbar-default">
<div className="container-fluid">
<ul className="nav nav-pills">
  <li role="presentation" className="active"><Link to="app">home</Link></li>
</ul>
</div>
</nav>
			)
	}
})

module.exports = Header;


/*
<Link to ="app" className="nav-brand"><img src ="images/logo.png"/>
</Link>
<ul>
<li><Link to="app">home</Link></li>
<li><Link to="authors">home</Link></li>
</ul>
*/