"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


var CompositionEditor = React.createClass({
    componentDidMount: function () {
        console.log(App);
        App.create();
    },
    render: function () {
        return (
              <div className="row">
                <div className="col-sm-3 sidebar">
                  
                </div>
                <div className="col-sm-9 col-sm-offset-3 main">
              1.3
               <canvas id="canvas" width="640" height="480">No Canvas.</canvas>
               
                </div>
            </div>
        );
    }
});

module.exports = CompositionEditor;    