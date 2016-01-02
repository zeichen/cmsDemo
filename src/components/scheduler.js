"use strict";

var React = require('react');
var Router = require('react-router');
var dataStore = require('../stores/DataStore')
var Link = Router.Link;
var DragSource = require('react-dnd').DragSource;

var Simple= require('./Simple/index');
var Schedule= require('./schedule/schedule');


var Scheduler = React.createClass({
	mixins: [Aui.Mixin],
	getInitialState: function(){
    return {
    //  list: dataStore.getList()
    }
  },
	componentDidMount:function(){
$('.visible.example .ui.sidebar')
  .sidebar({
    context: '.visible.example .bottom.segment'
  })
  .sidebar('hide');
  
	},

	render: function(){
		return (

<div className="ui bottom attached segment pushable">
  <div className="ui visible inverted left vertical sidebar menu">
  <div event_id={1451751058626} className="dhx_cal_event" style={{position: 'absolute', top: 48, left: 1, width: 150, height: '205.333px', zIndex: 1}}><div className="dhx_event_move dhx_header" style={{width: 148}}>&nbsp;</div><div className="dhx_event_move dhx_title" style={{}}>01:05 - 05:45</div><div className="dhx_body" style={{width: 140, height: '176.33333333333334px'}}>New event</div><div className="dhx_event_resize dhx_footer" style={{width: 146}} /></div>
    <a className="item">
      <i className="home icon"></i>
      Home
    </a>
    <a className="item">
      <i className="block layout icon"></i>
      Topics
    </a>
    <a className="item">
      <i className="smile icon"></i>
      Friends
    </a>
    <a className="item">
      <i className="calendar icon"></i>
      History
    </a>
  </div>
  <div className="pusher">
    <div className="ui basic segment">
  

<Schedule />

   
    
    </div>
  </div>
</div>

);
}
});

module.exports = Scheduler;    