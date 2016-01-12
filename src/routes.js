"use strict";

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
    <Route name="app" path="/" handler={require('./components/app')}>
        <DefaultRoute handler={require('./components/scheduler')}/>
        <Route name="comp" handler={require('./components/compositionList/ListContainer')}/>
        <Route name="scheduler" handler={require('./components/scheduler')}/>
        <Route name="editor" path="/editor" handler={require('./components/CompositionEditor')}>
            <Route path="/editor/:id" handler={require('./components/CompositionEditor')}/>
        </Route>
        <NotFoundRoute handler={require('./components/common/notFoundPage')}/>

    </Route>
);

module.exports = routes;
