/*eslint-disable strict */
//"use strict";

$ = jQuery = require('jquery');
_=require('lodash');
var Aui = require('aui/externals');
var jqueryUI= require('jquery-ui');
var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('./common/header');



var App = React.createClass({
    componentWillMount: function () {

  // $('body').append("<script src='vendor/calendar/fullcalendar.js'></script>");
    },
    render: function () {
        return (
<div>
        <Header/>
        <div className="container-fluid">
         
                <RouteHandler/>
           
             </div>
     </div>
        );
    }

});

module.exports = App;

  