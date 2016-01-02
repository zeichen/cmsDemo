"use strict";

var React = require('react');
var Link = require('react-router').Link;

var NotFoundPage = React.createClass({
    render: function () {
        return (
            <div>
                OH NO 404
            </div>
        );
    }
});

module.exports = NotFoundPage;