"use strict";

var React = require('react');
var Router = require('react-router');
var dataStore = require('../stores/DataStore')
var Link = Router.Link;
var DragSource = require('react-dnd').DragSource;
var Calendar = require('./calendar/Calendar');
var ListContainer = require('./compositionList/ListContainer');


var Scheduler = React.createClass({
    getInitialState: function () {
        return {
            //  list: dataStore.getList() 
        }
    },
    componentDidMount: function () {

    },
    render: function () {
        return (

            <div className="row">
                <div className="col-sm-3 sidebar">
                    <ListContainer />
                </div>
                <div className="col-sm-9 col-sm-offset-3 main">
                    <Calendar />
                </div>
            </div>

        );
    }
});

module.exports = Scheduler;    