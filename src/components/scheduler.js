"use strict";

var React = require('react');
var Router = require('react-router');
var dataStore = require('../stores/DataStore')
var Link = Router.Link;
var DragSource = require('react-dnd').DragSource;
var Simple = require('./Simple/index');
var Schedule = require('./schedule/schedule');
var ListContainer = require('./ListContainer')


var Scheduler = React.createClass({
    mixins: [Aui.Mixin],
    getInitialState: function () {
        return {
            //  list: dataStore.getList()
        }
    },
    componentDidMount: function () {
        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
    },
    render: function () {
        return (
            <div id="wrapper">
                <div id="sidebar-wrapper">
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand">
                            <a href="#"></a>
                        </li>
                    </ul>
                    <ListContainer />
                </div>
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">

                                <Schedule />
                            </div>
                        </div>
                    </div>
                </div>
            </div>






        );
    }
});

module.exports = Scheduler;    