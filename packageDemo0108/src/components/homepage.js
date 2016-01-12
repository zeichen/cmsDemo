"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Home = React.createClass({

    render: function () {
        return (
            <div>
                <div className="jumbotron">
                    <h1>內容推撥編輯</h1>

                    <Link to="app" className="btn btn-primary btn-lg">進入</Link>

                </div>
            </div>
        );
    }
});

module.exports = Home;    