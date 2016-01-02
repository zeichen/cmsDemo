//$ = jQuery = require('jquery');

"use strict";
var React = require('react');
var Router = require('react-router');
var RouteHandler = require('react-router').RouteHandler;
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');
//var ListContainer = require('components/ListContainer')

InitializeActions.initApp();

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});



