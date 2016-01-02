/*eslint-disable strict */ 
//"use strict";

$ = jQuery = require('jquery');
var Aui = require('aui/externals');


var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header=require('./common/header');

var App = React.createClass({

   render:function(){
	return (
<div>
1.1?
<RouteHandler/>
</div>
		);
}

});

module.exports = App;
