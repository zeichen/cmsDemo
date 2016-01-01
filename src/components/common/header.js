"use strict";

var React = require('react');
var Router = require ('react-router');
var Link =Router.Link;

var Header =React.createClass({

	render:function(){
		return(
<nav className="navbar navbar-default">
<div className="container-fluid">
<Link to ="app" className="nav-brand"><img src ="images/logo.png" width="48" height="48"/>
</Link>
<ul>
<li><Link to="app">home</Link></li>
<li><Link to="authors">authors</Link></li>
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