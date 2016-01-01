/*eslint-disable strict */ 
//"use strict";

$ = jQuery = require('jquery');

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header=require('./common/header');

var App = React.createClass({
render:function(){
	return (

<div>

<div className="container-fluid">
<Header/>
<RouteHandler/>
</div>
</div>
		);
}

});

module.exports = App;
