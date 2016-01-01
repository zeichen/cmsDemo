"use strict";

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route=Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes =(
<Route name ="app" path="/" handler ={require('./components/app')}>
<DefaultRoute handler = {require('./components/homepage')}/>
<Route name="authors" handler={require('./components/authors/authorPage')} />
<Route name="addAuthor" path='author' handler={require('./components/authors/manageAuthorPage')} />
<Route name="editAuthor" path='author/:id' handler={require('./components/authors/manageAuthorPage')} />
<NotFoundRoute handler={require('./components/common/notFoundPage')} />
<Redirect from ="about-us" to="authors" />
<Redirect from ="author" to="authors" />
</Route>
);

module.exports = routes;
